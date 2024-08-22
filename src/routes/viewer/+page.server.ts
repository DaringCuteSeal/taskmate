import type { PageServerLoad } from './$types';
import { pb } from '$lib/server/auth/auth';
import { getPreferences, type UserPreferences } from '$lib/server/notion/account_settings';
import { SESS_ID_COOKIE_NAME } from '$lib/server/auth/conf';


export const load: PageServerLoad = async ({ cookies, url }) => {
	const session_id = cookies.get(SESS_ID_COOKIE_NAME)

	if (session_id === undefined || session_id.toString().length == 0)
	{

		cookies.set("sess_id", "", { path: '/' });
		return {

			is_logged_in: false,
			preferences: undefined,
			session_id: null

		};
	}

	var preferences: UserPreferences | null = null;
	try {
		preferences =  await getPreferences(pb, session_id);
	}
	catch (e)
	{
		return {};
	}

	return {
		is_logged_in: true,
		preferences: preferences,
		session_id: session_id
	}
};
