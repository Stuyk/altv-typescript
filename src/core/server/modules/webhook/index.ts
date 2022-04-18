import { IConnectionInfo, log, logError, logWarning, Player } from 'alt-server';
import { Config } from 'cfg-reader';
const config = new Config('server.cfg');
import { MessageBuilder, Webhook } from 'discord-webhook-node';

const defaultHook = config.getOfType<string>('wh_default');
let playerHook: Webhook;
let hookEnabled = false;

if (!(defaultHook == undefined || defaultHook == 'exampleHook')) {
	playerHook = new Webhook(defaultHook);
	playerHook.setUsername('AltV-Logger');
	hookEnabled = true;
}

const Colors = {
	default: 25087,
	blue: 25087,
	green: 762640,
	white: 16777215,
	black: 0,
	orange: 16743168,
	lightgreen: 65309,
	yellow: 15335168,
	turqois: 62207,
	pink: 16711900,
	red: 16711680
};

export function WebhookPlayerConnected(player: Player) {
	log(`alt:V Server - ${player.name} joined the Server.`);

	if (hookEnabled) {
		const message = new MessageBuilder()
			.setTitle('User Connected')
			.addField('Name:', player.name, true)
			.addField('ID:', `${player.id}`, true)
			.addField('Pos:', `**X:** ${player.pos.x} **Y:** ${player.pos.y} **Z:** ${player.pos.z}`, false)
			.addField('HwID Hash', player.hwidHash)
			.addField('HwID Hash 2', player.hwidExHash)
			.setColor(Colors.green)
			.setTimestamp();
		playerHook.send(message);
	}
}

export function WebhookPlayerLeft(player: Player, reason: String) {
	log(`alt:V Server - ${player.name} left the Server.`);
	if (playerHook) {
		const message = new MessageBuilder()
			.setTitle('User Left')
			.addField('Name:', player.name, true)
			.addField('ID:', `${player.id}`, true)
			.addField('Pos:', `**X:** ${player.pos.x} **Y:** ${player.pos.y} **Z:** ${player.pos.z}`, false)
			.addField('HwID Hash', player.hwidHash)
			.addField('HwID Hash 2', player.hwidExHash)
			.setDescription(`Reason: ${reason}`)
			.setColor(Colors.orange)
			.setTimestamp();
		playerHook.send(message);
	}
}

export function WebhookResourceStart() {
	log(`alt:V Server - Server Started.`);

	if (playerHook) {
		const message = new MessageBuilder().setTitle('Server Started!').setColor(Colors.green).setTimestamp();
		playerHook.send(message);
	}
}

export async function WebhookResourceStop() {
	log(`alt:V Server - Server Stopped.`);

	if (playerHook) {
		const message = new MessageBuilder().setTitle('Server Stopped!').setColor(Colors.orange).setTimestamp();
		playerHook.send(message);
	}
}

export function WebhookEstablishDBConnection() {
	log(`alt:V Server - Database connection established.`);

	if (playerHook) {
		const message = new MessageBuilder()
			.setTitle('Database connection established!')
			.setColor(Colors.green)
			.setTimestamp();
		playerHook.send(message);
	}
}

export function WebhookResourceStartedWithDB() {
	log(`alt:V Server - Boilerplate Started`);
	log(`alt:V Server - Database connection established`);

	if (playerHook) {
		const message = new MessageBuilder()
			.setTitle('Database connection established and Boilerplate Started!')
			.setColor(Colors.green)
			.setTimestamp();
		playerHook.send(message);
	}
}

export function WebhookResourceStartedWithDBerr(err: String) {
	log(`alt:V Server - Boilerplate Started`);
	logError(`alt:V Server - Database connection error:\n${err}`);

	if (playerHook) {
		const message = new MessageBuilder()
			.setTitle('Boilerplate Started with a Database connection Error!')
			.setDescription(err.toString())
			.setColor(Colors.red)
			.setTimestamp();
		playerHook.send(message);
	}
}

export function WebhookErrorDBConnection(err: any) {
	logError(`alt:V Server - Database connection error:\n${err}`);

	if (playerHook) {
		const message = new MessageBuilder()
			.setTitle('Database connection error!')
			.setDescription(err.toString())
			.setColor(Colors.red)
			.setTimestamp();
		playerHook.send(message);
	}
}

export function WebhookBannedPlayer(player: IConnectionInfo) {
	logWarning(`alt:V Server - User ${player.name} | HWID: ${player.hwidHash} tried to Connect but he was Banned!`);

	if (playerHook) {
		const message = new MessageBuilder()
			.setTitle('Banned User tried to Connect')
			.addField('Name', player.name, true)
			.addField('IP', `${player.ip}`, true)
			.addField('SocialID', player.socialID, true)
			.addField('HwID Hash', player.hwidHash)
			.addField('HwID Hash 2', player.hwidExHash)
			.setColor(Colors.orange)
			.setTimestamp();
		playerHook.send(message);
	}
}
