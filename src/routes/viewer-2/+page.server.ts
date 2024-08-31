import type { PageServerLoad } from './$types';
import { pb } from '$lib/server/auth/auth';
import { getPreferences, type UserPreferences } from '$lib/server/notion/account_settings';
import { getTasks, getAgenda, getEvents, type Agenda, type SchoolEvent, type Task } from '$lib/server/notion/serializer';
import { SESS_ID_COOKIE_NAME } from '$lib/server/auth/conf';
import dayjs from 'dayjs';

enum UrlParamName {
	DATE = "date"
}

type PageLoadData = {
	is_logged_in: boolean,
	preferences: UserPreferences | null,
	session_id: string | undefined,
	agenda_data: Agenda | null,
	events_data: Array<SchoolEvent> | null,
	tasks_data: Array<Task> | null

}

const null_login: PageLoadData = {
	is_logged_in: false,
	preferences: null,
	session_id: undefined,
	agenda_data: null,
	events_data: null,
	tasks_data: null

}

export const load: PageServerLoad = async ({ cookies, url }) => {
	const session_id = cookies.get(SESS_ID_COOKIE_NAME)

	var preferences: UserPreferences | null = null;

	if (session_id === undefined || session_id.toString().length == 0)
	{

		cookies.set("sess_id", "", { path: '/' });
		return null_login;
	}

	try {
		preferences =  await getPreferences(pb, session_id);
	}
	catch (e)
	{
		cookies.set("sess_id", "", { path: '/' });
		return null_login;
	}

	var target_date = dayjs(url.searchParams.get(UrlParamName.DATE))
	if (!target_date.isValid())
	{
		target_date = dayjs();

	}

	return {
		is_logged_in: true,
		preferences: preferences,
		session_id: session_id,
		agenda_data: await getAgenda(target_date),
		events_data: await getEvents(target_date),
		tasks_data: await getTasks(target_date),

	}
};
