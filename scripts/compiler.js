import fs from 'fs-extra'
import * as glob from 'glob';
import swc from '@swc/core'
import { normalizeFilePath } from './shared.js';

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

const startTime = Date.now();
const filesToCompile = glob.sync('./src/core/**/*.ts');

if (fs.existsSync('resources/core')) {
    fs.rmSync('resources/core', { force: true, recursive: true });
}


let compileCount = 0;
for (let i = 0; i < filesToCompile.length; i++) {
    const filePath = normalizeFilePath(filesToCompile[i]);
    const finalPath = filePath.replace('src/', 'resources/').replace('.ts', '.js');
    const compiled = swc.transformFileSync(filePath, SWC_CONFIG);
    fs.outputFileSync(finalPath, compiled.code, { encoding: 'utf-8' });
    compileCount += 1;
}

console.log(`${compileCount} Files Built | ${Date.now() - startTime}ms`);;
