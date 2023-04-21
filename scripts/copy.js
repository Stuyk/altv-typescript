import fs from 'fs-extra'
import * as glob from 'glob';
import { normalizeFilePath } from './shared.js';

const startTime = Date.now();
const files = glob.sync(['src/core/**/*.!(ts)'])

let filesCopied = 0;
for (let file of files) {
    const filePath = normalizeFilePath(file);
    const finalPath = filePath.replace('src/', 'resources/');
    fs.copySync(filePath, finalPath, { overwrite: true });
    filesCopied += 1;
}

console.log(`${filesCopied} Files Moved | ${Date.now() - startTime}ms`);