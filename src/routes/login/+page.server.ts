import type { Actions, PageServerLoad } from './$types';
import { logInUser, registerUser } from '$lib/server/auth/auth';

const SESS_ID_COOKIE_NAME = "sess_id"

export const load: PageServerLoad = async ({ cookies }) => {
	const sessID = cookies.get(SESS_ID_COOKIE_NAME)
	return {
		session_id: sessID?.toString()
	}
};

export const actions = {
	login: async ({cookies, request}) =>
	{
		const data = await request.formData();
		const username = data.get('username');
		const password = data.get('password');
		var sessionID: string = "";

		if (username == null || password == null)
		{
			return { success: false};
		}
		else
		{
			try {
				sessionID = await logInUser(username.toString(), password.toString());
			}
			catch
			{
				return { success: false }
				
			}
			cookies.set("sess_id", sessionID, { path: '/' });
			return;

		}

		
	},
	register: async ({cookies, request}) => 
	{
		const data = await request.formData();

		const username = data.get('username');
		const password = data.get('password');

		if (username == null || password == null)
		{
			return { success: false};
		}
		else
	{
			try {
				await registerUser(username.toString(), password.toString());
				return { success: true }

			}
			catch
		{
				return { success: false }
			}
		}

	}

} satisfies Actions;

