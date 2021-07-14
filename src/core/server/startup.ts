import * as alt from 'alt-server';
import { invokeReconnection } from './utility/reconnect';

alt.log(`alt:V Server - Boilerplate Started`);
alt.on('playerConnect', handlePlayerConnect);

function handlePlayerConnect(player: alt.Player) {
    alt.log(`[${player.id}] ${player.name} has connected to the server.`);

    player.model = 'mp_m_freemode_01';
    player.spawn(36.19486618041992, 859.3850708007812, 197.71343994140625, 0);
    alt.emitClient(player, 'log:Console', 'alt:V Server - Boilerplate Started');
}

// altv-reconnect function
// Basically auto-reconnects you in the local environment with `debug: true`;
invokeReconnection();
