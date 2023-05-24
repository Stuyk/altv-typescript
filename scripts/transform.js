import path from 'path';
import * as glob from 'glob';
import fs from 'fs';
import { getResources } from './shared.js';

/**
 * What does this do?
 * Appends `.js` to the end of all imports that are not 'nodejs' imports.
 * This is required for alt:V
 */

const funcsToIgnore = [
    //
    'export function',
    'export const',
    'export let',
    'export async function',
    '=>',
];

async function transformResource(name) {
    const resourcePath = path.join(process.cwd(), `resources/${name}/**/*.js`).replace(/\\/gm, '/');
    const filePaths = glob.sync(resourcePath);

    for (let filePath of filePaths) {
        const fileContents = fs.readFileSync(filePath, { encoding: 'utf-8' });
        const splitContents = fileContents.split(/\r?\n/);

        const filePathing = filePath.split('/');
        filePathing.pop();
        const directoryPath = filePathing.join('/');

        let wasModified = false;
        for (let i = 0; i < splitContents.length; i++) {
            if (!splitContents[i].includes('import') && !splitContents[i].includes('export')) {
                continue;
            }

            let shouldSkip = false;
            for (let funcToIgnore of funcsToIgnore) {
                if (splitContents[i].includes(funcToIgnore)) {
                    shouldSkip = true;
                    break;
                }
            }

            if (shouldSkip) {
                continue;
            }

            const filePathReg = new RegExp(/('|").*.('|")/g);
            const extractions = splitContents[i].match(filePathReg);
            if (extractions === null || !extractions) {
                continue;
            }

            const relativeFilePath = extractions[0].replace(/'/gm, '').replace(/"/gm, '');
            if (relativeFilePath.charAt(0) !== '.' && relativeFilePath.charAt(0) !== '/') {
                continue;
            }

            const actualFilePath = path.join(directoryPath, relativeFilePath).replace(/\\/gm, '/');
            if (fs.existsSync(actualFilePath)) {
                const barrelFileTest = fs.statSync(actualFilePath);
                if (barrelFileTest.isDirectory()) {
                    splitContents[i] = splitContents[i].replace(relativeFilePath, `${relativeFilePath}/index.js`);
                    wasModified = true;
                    continue;
                }
            }

            if (!splitContents[i].includes('.js')) {
                splitContents[i] = splitContents[i].replace(relativeFilePath, `${relativeFilePath}.js`);
                wasModified = true;
            }
        }

        if (!wasModified) {
            continue;
        }

        const finalFile = splitContents.join('\r\n');
        fs.writeFileSync(filePath, finalFile, { encoding: 'utf-8' });
    }
}

for (let resource of getResources()) {
    transformResource(resource);
}