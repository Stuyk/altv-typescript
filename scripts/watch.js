import { spawnSync, spawn, ChildProcess } from 'node:child_process'
import Watcher from 'watcher';
import { writeToIpc, sleep } from './shared.js';
import fkill from 'fkill'

const fileWatcher = new Watcher(['./src'], { recursive: true, renameDetection: true });
const altvProcessName = process.platform === "win32" ? './altv-server.exe' : './altv-server'

/** @type {ChildProcess} */
let childProcess = undefined

function compiler() {
    console.log(`Starting Compile`)
    spawnSync('node', ['./scripts/compiler.js'], { stdio: 'inherit' })
    spawnSync('node', ['./scripts/transform.js'], { stdio: 'inherit' })
    spawnSync('node', ['./scripts/copy.js'], { stdio: 'inherit' })
    console.log(`Compile Complete`)
}

async function reboot() {
    writeToIpc('kick-all');
    await sleep(250);
    if (childProcess) {
        await fkill(':7788')

        if (!childProcess.killed) {
            try {
                childProcess.kill();
            } catch (err) { }
        }
    }

    compiler();
    childProcess = spawn(altvProcessName, { stdio: 'inherit' })
}

function start() {
    fileWatcher.on('change', reboot);
    reboot();
}

start();