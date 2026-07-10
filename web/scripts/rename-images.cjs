const fs = require('fs');
const path = require('path');

const tsFilePath = '/Users/alinprigoreanu/Documents/The United States of America/Website - Patriotic USA/usa-patriot-site/web/lib/data/wwii-history-images.ts';
const imagesBaseDir = '/Users/alinprigoreanu/Documents/The United States of America/Website - Patriotic USA/usa-patriot-site/web/IMAGES/History/WWII';

if (!fs.existsSync(tsFilePath)) {
  console.error("TS file not found:", tsFilePath);
  process.exit(1);
}

let content = fs.readFileSync(tsFilePath, 'utf8');

// Match import statements like: import name from "@/IMAGES/History/WWII/...";
const importRegex = /import\s+(\w+)\s+from\s+(?:"@\/IMAGES\/History\/WWII\/([^"]+)"|'@\/IMAGES\/History\/WWII\/([^']+)')/g;

let match;
const imports = [];

// Reset regex index
importRegex.lastIndex = 0;
while ((match = importRegex.exec(content)) !== null) {
  imports.push({
    fullMatch: match[0],
    variableName: match[1],
    relativePath: match[2] || match[3]
  });
}

console.log(`Found ${imports.length} image imports.`);

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD') // decompose characters
    .replace(/[\u0300-\u036f]/g, '') // remove accent marks
    .replace(/[^a-z0-9]+/g, '-') // replace non-alphanumeric with hyphen
    .replace(/^-+|-+$/g, '') // trim hyphens
    .replace(/-+/g, '-'); // replace multiple hyphens with single
}

let updatedContent = content;

imports.forEach(({ fullMatch, variableName, relativePath }) => {
  const fullSrcPath = path.join(imagesBaseDir, relativePath);
  
  if (!fs.existsSync(fullSrcPath)) {
    console.warn(`File does not exist: ${fullSrcPath}`);
    return;
  }

  const dir = path.dirname(relativePath);
  const ext = path.extname(relativePath);
  const filename = path.basename(relativePath, ext);
  
  // Create a clean slug
  const slug = slugify(filename);
  const newFilename = `${slug}${ext}`;
  const newRelativePath = dir === '.' ? newFilename : path.join(dir, newFilename);
  const fullDestPath = path.join(imagesBaseDir, newRelativePath);

  // Rename the file on disk
  if (fullSrcPath !== fullDestPath) {
    console.log(`Renaming: "${relativePath}" -> "${newRelativePath}"`);
    fs.renameSync(fullSrcPath, fullDestPath);
  }

  // Replace import statement in TS file content
  const newImportMatch = `import ${variableName} from "@/IMAGES/History/WWII/${newRelativePath.replace(/\\/g, '/')}"`;
  updatedContent = updatedContent.replace(fullMatch, newImportMatch);
});

// Write updated content back
fs.writeFileSync(tsFilePath, updatedContent, 'utf8');
console.log("Updated import statements in wwii-history-images.ts successfully!");
