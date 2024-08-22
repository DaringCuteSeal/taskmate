import PocketBase from 'pocketbase';
import { PB_USERS_DB, UsersDbField, type User,  } from "$lib/server/auth/conf"
import { NotionErrorTypes } from "./errors"
import { recordExists } from '../auth/utils';

export type UserPreferences = {
	extracurricular_wed: boolean,
	extracurricular_thu: boolean,
	extracurricular_fri: boolean,
	subjects_filter: Array<string>
}

function stringifySubjectsFilter(filter: Array<string>): string
{
	return filter.join(",")

}

export async function getPreferences(pb_instance: PocketBase, sess_id: string): Promise<UserPreferences|null>
{

	if (!(await recordExists(pb_instance, PB_USERS_DB, UsersDbField.SESSION_ID, sess_id)))
		throw new Error("invalid session", { cause: NotionErrorTypes.INVALID_SESS })

	const user = await pb_instance.collection(PB_USERS_DB).getFirstListItem(`${UsersDbField.SESSION_ID}="${sess_id}"`, { requestKey: null });
	return {
		subjects_filter: user.subjects_filter,
		extracurricular_wed: user.extracurricular_wed,
		extracurricular_thu: user.extracurricular_thu,
		extracurricular_fri: user.extracurricular_fri,
	}

}


export async function setPreferences(pb_instance: PocketBase, sess_id: string, preferences: UserPreferences)
{

	if (!(await recordExists(pb_instance, PB_USERS_DB, UsersDbField.SESSION_ID, sess_id)))
		throw new Error("invalid session", { cause: NotionErrorTypes.INVALID_SESS})

	const user = await pb_instance.collection(PB_USERS_DB).getFirstListItem(`${UsersDbField.SESSION_ID}="${sess_id}"`, { requestKey: null });
	const data: User = {
		username: user.username,
		password: user.password,
		extracurricular_wed: preferences.extracurricular_wed,
		extracurricular_thu: preferences.extracurricular_thu,
		extracurricular_fri: preferences.extracurricular_fri,
		session_id: sess_id,
		subjects_filter: stringifySubjectsFilter(preferences.subjects_filter),
		expiry: user.expiry
	};

	await pb_instance.collection(PB_USERS_DB).update('RECORD_ID', data);

}
