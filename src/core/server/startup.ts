import * as alt from 'alt-server';
import { Chat } from '../systems/chat/server';

const spawns = [
    { x: -695.1956176757812, y: 83.94725036621094, z: 55.85205078125 },
    { x: -527.6835327148438, y: -678.7252807617188, z: 33.6607666015625 },
    { x: 200.6637420654297, y: -935.2879028320312, z: 30.6783447265625 },
    { x: 897.7318725585938, y: -1054.6944580078125, z: 32.818359375 },
    { x: 363.1516418457031, y: -2123.156005859375, z: 16.052734375 },
    { x: -265.3582458496094, y: -1898.0703125, z: 27.7464599609375 }
];

function randomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function getRandomListEntry(list) {
    return randomNumber(0, list.length - 1);
}

alt.on('playerConnect', function(player: alt.Player) {
    alt.log(`[${player.id}] ${player.name} has connected to the server.`);

    player.model = 'mp_m_freemode_01';

    const spawn = spawns[getRandomListEntry(spawns)];
    player.spawn(spawn.x, spawn.y, spawn.z, 0);

    alt.emitClient(player, 'log:Console', 'alt:V Server - Boilerplate Started');

    Chat.send(player, `Welcome to the server, ${player.name}!`);
});

Chat.init();

Chat.registerCmd('veh', (player, args) => {
    if (args.length === 0) {
        Chat.send(player, 'Usage: /veh (vehicleModel)');
        return;
    }
    try {
        let vehicle = new alt.Vehicle(args[0], player.pos.x, player.pos.y, player.pos.z, 0, 0, 0);
        vehicle.engineOn = true;

        player.setIntoVehicle(vehicle, 1);

        let pvehs = player.getMeta<alt.Vehicle[]>('vehicles') ?? [];
        if (pvehs.length >= 3) {
            let toDestroy = pvehs.pop();
            if (toDestroy != null) {
                toDestroy.destroy();
            }
        }
        pvehs.unshift(vehicle);
        player.setMeta('vehicles', pvehs);
    } catch (e) {
        Chat.send(player, `{ff0000} Vehicle Model {ff9500}${args[0]} {ff0000}does not exist..`);
        alt.log(e);
    }
});
