const fs = require("fs");
const path = require("path");

const file = "/Users/alinprigoreanu/Documents/The United States of America/Website - Patriotic USA/usa-patriot-site/web/ASSETS/GeoJSON/NTAD_National_Highway_System_-2908344783259962276.geojson";
const outputFile = "/Users/alinprigoreanu/Documents/The United States of America/Website - Patriotic USA/usa-patriot-site/web/lib/data/interstates-simplified.json";

function mergeSegments(segments) {
  if (segments.length === 0) return [];
  
  const adj = {};
  const getK = pt => pt[0].toFixed(3) + "," + pt[1].toFixed(3);
  
  segments.forEach((seg, idx) => {
    const start = getK(seg[0]);
    const end = getK(seg[seg.length - 1]);
    
    if (!adj[start]) adj[start] = [];
    adj[start].push({ idx, isStart: true });
    
    if (!adj[end]) adj[end] = [];
    adj[end].push({ idx, isStart: false });
  });
  
  const visited = new Set();
  const paths = [];
  
  segments.forEach((seg, startIdx) => {
    if (visited.has(startIdx)) return;
    
    let currentPath = [...seg];
    visited.add(startIdx);
    
    let growing = true;
    while (growing) {
      growing = false;
      const endK = getK(currentPath[currentPath.length - 1]);
      const neighbors = adj[endK] || [];
      for (const n of neighbors) {
        if (!visited.has(n.idx)) {
          visited.add(n.idx);
          const nextSeg = segments[n.idx];
          if (n.isStart) {
            currentPath = currentPath.concat(nextSeg.slice(1));
          } else {
            currentPath = currentPath.concat(nextSeg.slice(0, -1).reverse());
          }
          growing = true;
          break;
        }
      }
    }
    
    growing = true;
    while (growing) {
      growing = false;
      const startK = getK(currentPath[0]);
      const neighbors = adj[startK] || [];
      for (const n of neighbors) {
        if (!visited.has(n.idx)) {
          visited.add(n.idx);
          const nextSeg = segments[n.idx];
          if (n.isStart) {
            currentPath = nextSeg.slice(0, -1).reverse().concat(currentPath);
          } else {
            currentPath = nextSeg.slice(0, -1).concat(currentPath);
          }
          growing = true;
          break;
        }
      }
    }
    
    paths.push(currentPath);
  });
  
  return paths;
}

function processGeoJSON() {
  const fd = fs.openSync(file, "r");
  const chunkSize = 1024 * 1024;
  const buffer = Buffer.alloc(chunkSize);
  let leftover = Buffer.alloc(0);
  
  const rawInterstates = {};
  let featuresProcessed = 0;

  while (true) {
    const bytesRead = fs.readSync(fd, buffer, 0, chunkSize, null);
    if (bytesRead === 0) break;
    
    let combined = Buffer.concat([leftover, buffer.subarray(0, bytesRead)]);
    let startIdx = 0;
    
    while (true) {
      const featMarker = Buffer.from("{\"type\":\"Feature\"");
      const pos = combined.indexOf(featMarker, startIdx);
      if (pos === -1) {
        leftover = combined.subarray(startIdx);
        break;
      }
      
      const nextPos = combined.indexOf(featMarker, pos + 1);
      if (nextPos === -1) {
        leftover = combined.subarray(pos);
        break;
      }
      
      let featureStr = combined.toString("utf8", pos, nextPos).trim();
      if (featureStr.endsWith(",")) {
        featureStr = featureStr.slice(0, -1);
      }
      
      try {
        const feat = JSON.parse(featureStr);
        if (feat.properties && feat.properties.SIGNT1 === "I") {
          const route = feat.properties.SIGN1;
          if (/^I\d{1,2}$/.test(route)) {
            if (feat.geometry && feat.geometry.type === "LineString") {
              const coords = feat.geometry.coordinates;
              const cleanCoords = coords.map(pt => [
                Math.round(pt[0] * 1000) / 1000,
                Math.round(pt[1] * 1000) / 1000
              ]);
              if (cleanCoords.length >= 2) {
                if (!rawInterstates[route]) {
                  rawInterstates[route] = [];
                }
                rawInterstates[route].push(cleanCoords);
              }
            }
          }
        }
        featuresProcessed++;
      } catch (err) {}
      
      startIdx = nextPos;
    }
  }
  
  fs.closeSync(fd);
  
  console.log("Parsing complete. Merging segments topologically in linear time...");
  
  const mergedInterstates = {};
  for (const route in rawInterstates) {
    const rawSegs = rawInterstates[route];
    const mergedSegs = mergeSegments(rawSegs);
    console.log(`Route ${route}: original segments = ${rawSegs.length}, merged = ${mergedSegs.length}`);
    
    const downsampledSegs = mergedSegs.map(seg => {
      const down = [];
      const step = Math.max(1, Math.floor(seg.length / 30));
      for (let i = 0; i < seg.length; i += step) {
        down.push(seg[i]);
      }
      if (down[down.length - 1][0] !== seg[seg.length - 1][0] || 
          down[down.length - 1][1] !== seg[seg.length - 1][1]) {
        down.push(seg[seg.length - 1]);
      }
      return down;
    });
    
    mergedInterstates[route] = downsampledSegs;
  }
  
  fs.writeFileSync(outputFile, JSON.stringify(mergedInterstates));
  console.log("Output size:", fs.statSync(outputFile).size, "bytes");
}

processGeoJSON();
