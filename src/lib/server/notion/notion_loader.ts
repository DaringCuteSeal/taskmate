import { Client } from '@notionhq/client';
import { NOTION_TOKEN, NOTION_TASKS_DB, NOTION_AGENDA_DB, NOTION_CALENDAR_DB } from '$env/static/private';
import type { ListBlockChildrenResponse, QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';
import {} from "./errors"
import dayjs from 'dayjs';

const notion = new Client({
	auth: NOTION_TOKEN,
});

export async function queryTasksNotion(date: dayjs.Dayjs, ): Promise<QueryDatabaseResponse>
{
	const databaseId = NOTION_TASKS_DB;
	return await notion.databases.query(
			{
			database_id: databaseId,
			filter: {
				"and": [
					{
						"property": "Due",
						"date": {
							"on_or_after": date.format("YYYY-MM-DD")
						},
					},
					{
						"property": "Created",
						"date": {
							"on_or_before": date.format("YYYY-MM-DD")
						}

					}
				]
			},
			sorts: [
			{
				"property": "Due",
				"direction": "ascending"
			},
			]
		}
	);

};

export async function queryAgendaNotion(date: dayjs.Dayjs): Promise<QueryDatabaseResponse>
{
	const databaseId = NOTION_AGENDA_DB;
	return await notion.databases.query(
			{
			database_id: databaseId,
			filter: {
				"property": "Date",
				"date": {
					"equals": date.format("YYYY-MM-DD")
				},
			}
		}
	);

};

export async function queryCalendarNotion(date: dayjs.Dayjs): Promise<QueryDatabaseResponse>
{
	const databaseId = NOTION_CALENDAR_DB;
	return await notion.databases.query(
			{
			database_id: databaseId,
			filter: {
				"property": "Date",
				"date": {
					"equals": date.format("YYYY-MM-DD")
				},
			}
		}
	);

};

export async function queryPageBlocks(page_id: string): Promise<ListBlockChildrenResponse>
{
	return await notion.blocks.children.list({
		block_id: page_id,
		page_size: 1,
	});
}
