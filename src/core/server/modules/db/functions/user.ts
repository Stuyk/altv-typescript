import { IConnectionInfo, Player } from 'alt-server';
import { DB } from '..';
import { User } from '../entities/user';

export async function getConnectedUser(player: Player): Promise<User> {
	const user = await DB.createQueryBuilder()
		.select('user')
		.from(User, 'user')
		.where('user.socialID = :socialID', { socialID: player.socialID })
		.getOne();
	return user;
}

export async function getUserBeforeConnected(player: IConnectionInfo): Promise<User> {
	const user = await DB.createQueryBuilder()
		.select('user')
		.from(User, 'user')
		.where('user.socialID = :socialID', { socialID: player.socialID })
		.getOne();
	return user;
}

export async function IsNewUser(player: IConnectionInfo): Promise<Boolean> {
	const user = await DB.createQueryBuilder()
		.select('user')
		.from(User, 'user')
		.where('user.socialID = :socialID', { socialID: player.socialID })
		.getOne();

	if (user != undefined || user != null) return false;
	return true;
}

export async function newUser(player: IConnectionInfo): Promise<User> {
	await DB.createQueryBuilder()
		.insert()
		.into(User)
		.values({ username: player.name, socialID: player.socialID, banned: false })
		.execute();
	return await getUserBeforeConnected(player);
}
