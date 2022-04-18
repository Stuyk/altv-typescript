import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User extends BaseEntity {
	@PrimaryColumn({
		generated: true,
		unique: true
	})
	id: number;

	@PrimaryColumn() socialID: string;

	@Column() discordID: number;

	@PrimaryColumn({
		unique: true,
		length: 18
	})
	username: string;

	@Column() banned: boolean;

	@CreateDateColumn() first_joined: Date;
}
