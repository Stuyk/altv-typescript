import fs from 'fs-extra'
import * as glob from 'glob';
import { getResources, normalizeFilePath } from './shared.js';

async function copyResourceAssets(name) {
    const startTime = Date.now();
    const files = glob.sync(`./src/${name}/**/*.!(ts)`);

    let filesCopied = 0;
    for (let file of files) {
        const filePath = normalizeFilePath(file);
        const finalPath = filePath.replace('src/', 'resources/');
        fs.copySync(filePath, finalPath, { overwrite: true });
        filesCopied += 1;
    }

    console.log(`[${name}] | ${filesCopied} Files Moved | ${Date.now() - startTime}ms`);
}

for (let resource of getResources()) {
    copyResourceAssets(resource);
}