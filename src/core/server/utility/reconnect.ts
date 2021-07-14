import * as alt from 'alt-server';
import fs from 'fs';
import * as http from 'http';

const DEFAULT_SERVER_CFG = fs.readFileSync('server.cfg').toString();
const VALID_DEBUG_STRINGS = [
    'debug: true',
    'debug:true',
]

export function invokeReconnection() {
    for(let i = 0; i < VALID_DEBUG_STRINGS.length; i++) {
        if (DEFAULT_SERVER_CFG.toLowerCase().includes(VALID_DEBUG_STRINGS[i])) {
            const req = http.get('http://localhost:9229/reconnect');
            // const req = http.get('http://localhost:9229/reconnect/debug');

            req.on('error', () => {
                alt.log(`[altv-reconnect] Probably Not Running Reconnection Script`);
            });

            req.on('response', () => {
                alt.log(`[altv-reconnect] Finished Reconnection`);
            });
        }
    }
}






