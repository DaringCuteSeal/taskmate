import type { RequestHandler } from './$types';
import { queryTasksNotion, queryAgendaNotion, queryCalendarNotion } from "$lib/server/notion_loader";
import dayjs from 'dayjs';
import type { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';

enum RequestTypes {
	TASKS = "tasks",
	CALENDAR = "calendar",
	AGENDA = "agenda"
}

export const GET: RequestHandler = async ({ url }) => {
	try {
		var result: QueryDatabaseResponse;

		const url_date = url.searchParams.get("date");
		const query_date = url_date != null ? dayjs(url_date ) : dayjs();
		if (!query_date.isValid())
			return new Response('{ "message": "Invalid date!"}', { "status": 500 })

		switch(url.searchParams.get('type'))
			{
			case RequestTypes.TASKS:
				result = await queryTasksNotion(dayjs(query_date));
				break;
			case RequestTypes.CALENDAR:
				result = await queryCalendarNotion(dayjs(query_date));
				break;
			case RequestTypes.AGENDA:
				result = await queryAgendaNotion(dayjs(query_date));
				break;
			default:
				return new Response('{ "message": "Error, invalid request type!" }', { "status": 500 })

		}
		return new Response(JSON.stringify(result))
	}
	catch (err)
	{
		return new Response('{ "message": "Notion query error!"}', { "status": 500 })
	}

}
