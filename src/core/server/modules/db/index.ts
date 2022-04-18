import { Config } from 'cfg-reader';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entities/user';

const config = new Config('server.cfg');

export const DB = new DataSource({
	type: 'mariadb',
	host: config.getOfType<string>('db_host'),
	port: config.getOfType<number>('db_port'),
	username: config.getOfType<string>('db_username'),
	password: config.getOfType<string>('db_password').toString(),
	database: config.getOfType<string>('db_database'),
	entities: [ User ],
	synchronize: true,
	logging: false
});
