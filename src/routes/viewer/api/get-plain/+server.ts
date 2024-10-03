/* Provides text-based agenda rendering.
 * Very quick and dirty; separate into components if needed.
 * */

import type { RequestHandler } from './$types';
import { get_page_data } from '../../+page.server';
import { getContext } from 'svelte';
const i18n = getContext("i18n");

function component_get_school_duration(start: string | null,
	end: string | null,
	end_extracurricular: string | null,
	extracurricular: boolean | null = false
)
{
{ $i18n.t("viewer:school_start")}


}

export const GET: RequestHandler = async ({ cookies, url }) =>
{
	const params = url.searchParams;
	const page_data = await get_page_data(cookies, url);

	const lang = params.get("lang");
	if (lang != null)
{
		$i18n.changeLanguage(lang);

	}
	else {

		$i18n.changeLanguage(page_data.preferences?.language ?? "en");
	}

};
