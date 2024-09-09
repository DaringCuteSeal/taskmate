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
	preferences: UserPreferences | null,
	session_id: string | undefined,
	agenda_data: Agenda | null,
	events_data: Array<SchoolEvent> | null,
	tasks_data: Array<Task> | null
	date: string | null,

}

export const load: PageServerLoad = async ({ cookies, url }) => {
	const session_id = cookies.get(SESS_ID_COOKIE_NAME);

	var preferences: UserPreferences | null = null;

	if (session_id !== undefined && session_id.toString().length > 0)
	{
		try {
			preferences =  await getPreferences(pb, session_id);
		}
		catch (e)
	{
			preferences = null;
		}

	}


	var target_date = dayjs(url.searchParams.get(UrlParamName.DATE))

	if (!target_date.isValid())
	{
		target_date = dayjs().add(1, "day");

	}

	return {
		is_logged_in: true,
		preferences: preferences,
		session_id: session_id,
		agenda_data: await getAgenda(target_date),
		events_data: await getEvents(target_date),
		tasks_data: await getTasks(target_date),
		date: target_date.format(),

	}
};
