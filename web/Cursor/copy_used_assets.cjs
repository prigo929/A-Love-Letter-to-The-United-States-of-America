const fs = require('fs');
const path = require('path');

const webDir = path.resolve(__dirname, '..');
const appDir = path.join(webDir, 'app');
const componentsDir = path.join(webDir, 'components');
const libDir = path.join(webDir, 'lib');

const publicImagesDir = path.join(webDir, 'public', 'images', 'library');
const publicVideosDir = path.join(webDir, 'public', 'videos', 'library');

const sourceImagesDir = path.join(webDir, 'IMAGES');
const sourceVideosDir = path.join(webDir, 'VIDEOS');

// Directories to scan for string references
const scanDirs = [appDir, componentsDir, libDir];

// Set of referenced assets
const referencedImages = new Set();
const referencedVideos = new Set();

// Regular expressions to find references in double quotes, single quotes, or backticks
const doubleQuoteImgRegex = /"\/images\/library\/([^"]+)"/g;
const singleQuoteImgRegex = /'\/images\/library\/([^']+)'/g;
const backtickImgRegex = /`\/images\/library\/([^`]+)`/g;

const doubleQuoteVideoRegex = /"\/videos\/library\/([^"]+)"/g;
const singleQuoteVideoRegex = /'\/videos\/library\/([^']+)'/g;
const backtickVideoRegex = /`\/videos\/library\/([^`]+)`/g;

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  let match;

  // Function to process and add matches
  function processMatches(regex, set) {
    regex.lastIndex = 0;
    while ((match = regex.exec(content)) !== null) {
      let relPath = decodeURIComponent(match[1]);
      // Clean up if there are queries or hashes in the URL
      relPath = relPath.split('?')[0].split('#')[0].trim();
      set.add(relPath);
    }
  }

  // Scan images
  processMatches(doubleQuoteImgRegex, referencedImages);
  processMatches(singleQuoteImgRegex, referencedImages);
  processMatches(backtickImgRegex, referencedImages);

  // Scan videos
  processMatches(doubleQuoteVideoRegex, referencedVideos);
  processMatches(singleQuoteVideoRegex, referencedVideos);
  processMatches(backtickVideoRegex, referencedVideos);
}

function traverseDirectory(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      traverseDirectory(fullPath);
    } else if (stat.isFile() && /\.(js|jsx|ts|tsx)$/.test(file)) {
      scanFile(fullPath);
    }
  }
}

console.log('Scanning directories for asset references...');
scanDirs.forEach(traverseDirectory);

console.log(`Found ${referencedImages.size} referenced images and ${referencedVideos.size} referenced videos.`);

// We need to delete the symlinks if they exist
function removeSymlink(destDir) {
  if (fs.existsSync(destDir)) {
    const stat = fs.lstatSync(destDir);
    if (stat.isSymbolicLink()) {
      console.log(`Removing symlink at ${destDir}`);
      fs.unlinkSync(destDir);
    } else if (stat.isDirectory()) {
      // If it's a directory, leave it
      console.log(`Directory already exists at ${destDir}`);
    }
  }
}

removeSymlink(publicImagesDir);
removeSymlink(publicVideosDir);

// Function to copy files maintaining directory structure
function copyAssets(referencedSet, sourceDir, destDir) {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  let copiedCount = 0;
  let missingCount = 0;

  for (const relPath of referencedSet) {
    const srcPath = path.join(sourceDir, relPath);
    const destPath = path.join(destDir, relPath);

    if (fs.existsSync(srcPath)) {
      const destSubDir = path.dirname(destPath);
      if (!fs.existsSync(destSubDir)) {
        fs.mkdirSync(destSubDir, { recursive: true });
      }
      fs.copyFileSync(srcPath, destPath);
      copiedCount++;
    } else {
      console.warn(`Warning: Referenced file does not exist at source: ${srcPath}`);
      missingCount++;
    }
  }

  console.log(`Copied ${copiedCount} files to ${destDir}. Missing: ${missingCount}`);
}

console.log('Copying images...');
copyAssets(referencedImages, sourceImagesDir, publicImagesDir);

console.log('Copying videos...');
copyAssets(referencedVideos, sourceVideosDir, publicVideosDir);

console.log('Done!');
