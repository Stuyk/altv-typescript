import fs from 'fs-extra';
import toml from 'toml';

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

function shouldCompileResource(name) {
    const path = `./src/${name}`;
    if (!fs.existsSync(path)) {
        return false;
    }
    return !fs.existsSync(`${path}/.nocompile`);
}

let serverConfigPath = './server.toml';
export function getResources() {
    if (!fs.existsSync(serverConfigPath)) {
        console.log('server.toml does not exist, please create one.');
        return [];
    }
    const fileContents = fs.readFileSync(serverConfigPath, { encoding: 'utf-8' });
    const serverConfig = toml.parse(fileContents);
    serverConfig.resources = serverConfig.resources.filter(shouldCompileResource);
    return serverConfig.resources;
}
