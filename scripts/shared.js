import fs from 'fs-extra';

export function normalizeFilePath(filePath) {
    return filePath.replace(/\\/gm, '/');
}

export function writeToIpc(command) {
    fs.appendFileSync('ipc.txt', `\r\n${command}`);
}

export async function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    })
}