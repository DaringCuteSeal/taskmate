import type { PageServerLoad } from './$types';
import { pb } from '$lib/server/auth/auth';
import { getPreferences, type UserPreferences } from '$lib/server/notion/account_settings';

const SESS_ID_COOKIE_NAME = "sess_id"

export const load: PageServerLoad = async ({ cookies, url }) => {
	const session_id = cookies.get(SESS_ID_COOKIE_NAME)

	if (session_id === undefined)
		return {};

	var preferences: UserPreferences | null = null;
	try {
		preferences =  await getPreferences(pb, session_id);
	}
	catch (e)
	{
		return {};
	}

	return {
		preferences: preferences,
		session_id: session_id
	}
};
