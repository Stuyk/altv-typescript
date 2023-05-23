import fs from 'fs-extra'
import * as glob from 'glob';
import swc from '@swc/core'
import { getResources, normalizeFilePath } from './shared.js';

const SWC_CONFIG = {
    jsc: {
        parser: {
            syntax: 'typescript',
            dynamicImport: true,
            decorators: true,
        },
        transform: {
            legacyDecorator: true,
            decoratorMetadata: true,
        },
        target: 'es2020',
    },
    sourceMaps: false,
};

async function buildTargetResource(name) {
    const startTime = Date.now();

    if (fs.existsSync(`resources/${name}`)) {
        fs.rmSync(`resources/${name}`, { force: true, recursive: true });
    }

    const filesToCompile = glob.sync(`./src/${name}/**/*.ts`);
    let compileCount = 0;
    for (let i = 0; i < filesToCompile.length; i++) {
        const filePath = normalizeFilePath(filesToCompile[i]);
        const finalPath = filePath.replace('src/', 'resources/').replace('.ts', '.js');
        const compiled = swc.transformFileSync(filePath, SWC_CONFIG);
        fs.outputFileSync(finalPath, compiled.code, { encoding: 'utf-8' });
        compileCount += 1;
    }

    console.log(`[${name}] Has built ${compileCount} files in ${Date.now() - startTime}ms`)
}

for (let resource of getResources()) {
    buildTargetResource(resource);
}