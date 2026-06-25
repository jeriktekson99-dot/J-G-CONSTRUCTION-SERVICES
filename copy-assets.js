import fs from 'fs';
import path from 'path';

const srcDir = path.join(process.cwd(), 'src', 'assets', 'images');
const destDir = path.join(process.cwd(), 'public', 'src', 'assets', 'images');

// Ensure destination directory exists
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Read and copy all files
if (fs.existsSync(srcDir)) {
  const files = fs.readdirSync(srcDir);
  for (const file of files) {
    const srcFile = path.join(srcDir, file);
    const destFile = path.join(destDir, file);
    
    // Only copy files, not subdirectories
    if (fs.statSync(srcFile).isFile()) {
      fs.copyFileSync(srcFile, destFile);
      console.log(`Successfully copied ${file} to public asset directory`);
    }
  }
  console.log('All construction asset images copied successfully to the public directory!');
} else {
  console.warn('Source image assets directory not found!');
}
