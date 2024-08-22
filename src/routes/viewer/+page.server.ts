import type { Actions, RequestEvent, PageServerLoad } from './$types';
import { logInUser, registerUser } from '$lib/server/auth/auth';

const SESS_ID_COOKIE_NAME = "sess_id"

export const load: PageServerLoad = async ({ cookies, url }) => {
	const sessID = cookies.get(SESS_ID_COOKIE_NAME)
	const params = url.searchParams
	return {
		session_id: sessID?.toString()
	}
};
