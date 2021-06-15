import * as alt from 'alt-server';

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
