import type { PageServerLoad } from './$types';
import { pb } from '$lib/server/auth/auth';
import { getPreferences, type UserPreferences } from '$lib/server/notion/account_settings';
import { getTasks, getAgenda, getEvents, type Agenda, type SchoolEvent, type Task } from '$lib/server/notion/serializer';
import { SESS_ID_COOKIE_NAME } from '$lib/server/auth/conf';
import dayjs from 'dayjs';
import type { Cookies } from '@sveltejs/kit';

enum UrlParamName {
	DATE = "date",
	LANGUAGE = "lang"
}

type PageLoadData = {
	preferences: UserPreferences | null,
	session_id: string | undefined,
	agenda_data: Agenda | null,
	events_data: Array<SchoolEvent> | null,
	tasks_data: Array<Task> | null
	date: string | null,
	override_language: string | null,
}

async function get_page_data(cookies: Cookies, url: URL): Promise<PageLoadData> {
	const session_id = cookies.get(SESS_ID_COOKIE_NAME);

	let preferences: UserPreferences | null = null;

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

	const language = url.searchParams.get(UrlParamName.LANGUAGE);
	let target_date = dayjs(url.searchParams.get(UrlParamName.DATE))

	if (!target_date.isValid())
	{
		target_date = dayjs().add(1, "day");

	}

	return {
		preferences: preferences,
		session_id: session_id,
		agenda_data: await getAgenda(target_date),
		events_data: await getEvents(target_date),
		tasks_data: await getTasks(target_date),
		date: target_date.format(),
		override_language: language
	} satisfies PageLoadData

}
export const load: PageServerLoad = async ({ cookies, url }) => {
	return await get_page_data(cookies, url) satisfies PageLoadData
};

