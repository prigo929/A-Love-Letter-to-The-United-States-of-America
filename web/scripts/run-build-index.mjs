import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const siteImagesPath = path.join(process.cwd(), "lib/site-images.ts");

// Read and cache site-images.ts
const originalContent = fs.readFileSync(siteImagesPath, "utf-8");

try {
  console.log("Temporarily stubbing lib/site-images.ts to avoid ESM image loader issues...");
  // Write proxy mock
  fs.writeFileSync(
    siteImagesPath,
    `export const SITE_IMAGES: any = new Proxy({}, { get: () => "" });\n`,
    "utf-8"
  );

  console.log("Running build-search-index.ts...");
  execSync("npx tsx scripts/build-search-index.ts", { stdio: "inherit" });
  console.log("Build search index script executed successfully.");
} catch (error) {
  console.error("Error executing build-search-index.ts:", error);
  process.exit(1);
} finally {
  console.log("Restoring lib/site-images.ts...");
  fs.writeFileSync(siteImagesPath, originalContent, "utf-8");
  console.log("Restored lib/site-images.ts successfully.");
}
