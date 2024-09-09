import PocketBase from 'pocketbase';
import { recordExists } from './utils';
import { PB_USERS_DB, PB_DB_URL, UsersDbField, PB_FINISHED_TASKS_DB, type User, PB_ADMIN_PASSWORD, PB_ADMIN_USER } from './conf';
import ShortUniqueId from 'short-unique-id';
import { hash as argon2Hash, verify as argon2Verify } from 'argon2';
import dayjs from 'dayjs';

type SessID = string;

export const pb = new PocketBase(PB_DB_URL);

if (PB_ADMIN_PASSWORD != undefined && PB_ADMIN_USER != undefined)
{
	await pb.admins.authWithPassword(PB_ADMIN_USER, PB_ADMIN_PASSWORD);
}
else
{
	throw new Error("Admin password for database not set!");
}

function saltPassword(username: string, password: string): string
{
	return password + username.toUpperCase().slice(username.length / 2)
}

async function hashPassword(password: string): Promise<string>
{
	return await argon2Hash(password)

}

async function verifyPassword(hash: string, password: string): Promise<bool>
{
	return await argon2Verify(hash, password);
}

function generateSessID(): string
{
	const uid = new ShortUniqueId({
		dictionary: 'hex',
	});
	return uid.stamp(128);

}

export async function registerUser(username: string, password: string): Promise<User>
{
	if (await recordExists(pb, PB_USERS_DB, UsersDbField.USERNAME, username))
		throw new Error("Username already taken!")
	console.log(await hashPassword(password));

	const user: User = {
		username: username,
		password: await hashPassword(password),
		session_id: null,
		extracurricular_wed: false,
		extracurricular_thu: false,
		extracurricular_fri: false,
		subjects_filter: null,
		expiry: null,
		lang: null

	}

	return await pb.collection('users').create(user);
}

export async function logInUser(username: string, password: string): Promise<SessID>
{
	if (!recordExists(pb, PB_USERS_DB, UsersDbField.USERNAME, username))
		throw new Error("User does not exist!")

	const user_record = await pb.collection(PB_USERS_DB).getFirstListItem(`username="${username}"`);
	console.log(await verifyPassword(user_record.password, password));
	if (await verifyPassword(user_record.password, password))
	{
		var sessID: SessID;
		if (user_record.session_id != null)
		{
			sessID = generateSessID();
		}
		else {
			sessID = user_record.session_id;
		}

		const user_data: User = {
			username: user_record.username,
			password: user_record.password,
			session_id: sessID,
			extracurricular_wed: user_record.extracurricular_wed,
			extracurricular_thu: user_record.extracurricular_thu,
			extracurricular_fri: user_record.extracurricular_fri,
			expiry: dayjs().add(1, "week").format(),
			subjects_filter: user_record.subjects_filter,
			lang: user_record.lang
		}

		const record = await pb.collection(PB_USERS_DB).update(user_record.id, user_data);
		return record.session_id;

	}
	throw new Error("Incorrect password!")
}
