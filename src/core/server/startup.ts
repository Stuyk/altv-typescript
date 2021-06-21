import * as alt from 'alt-server';
import * as http from 'http';

const SPAWN_POS = {
    x: 36.19486618041992,
    y: 859.3850708007812,
    z: 197.71343994140625,
};

alt.log(`alt:V Server - Boilerplate Started`);
alt.on('playerConnect', handlePlayerConnect);

function handlePlayerConnect(player: alt.Player) {
    alt.log(`[${player.id}] ${player.name} has connected to the server.`);

    player.model = 'mp_m_freemode_01';
    player.spawn(SPAWN_POS.x, SPAWN_POS.y, SPAWN_POS.z, 0);
    alt.emitClient(player, 'log:Console', 'alt:V Server - Boilerplate Started');
}

// Used for an Auto-Reconnection Script.
const req = http.get('http://localhost:9229/reconnect');

req.on('error', () => {
    console.log(`[altv-reconnect] Probably Not Running Reconnection Script`);
});
