import * as alt from 'alt-server';
import './modules/db';
import { DB } from './modules/db';
import { WebhookResourceStartedWithDB, WebhookResourceStartedWithDBerr } from './modules/webhook';

alt.on('playerConnect', handlePlayerConnect);

DB.initialize()
	.then((connection) => {
		WebhookResourceStartedWithDB();
	})
	.catch((err) => WebhookResourceStartedWithDBerr(err));

function handlePlayerConnect(player: alt.Player) {
	alt.log(`[${player.id}] ${player.name} has connected to the server.`);

	player.model = 'mp_m_freemode_01';
	player.spawn(36.19486618041992, 859.3850708007812, 197.71343994140625, 0);
	alt.emitClient(player, 'log:Console', 'alt:V Server - Boilerplate Started');
}
