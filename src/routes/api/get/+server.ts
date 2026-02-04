import { TASKMATE_API_KEY } from '$env/static/private';
import { json, error, type RequestHandler } from '@sveltejs/kit';
import dayjs from 'dayjs';
import { getAgenda, getEvents, getTasks, type Agenda, type SchoolEvent, type Task } from '$lib/server/notion/deserializer';

type AgendaData = {
	agenda_data: Agenda | null,
	events_data: Array<SchoolEvent> | null,
	tasks_data: Array<Task> | null
}

export const POST: RequestHandler = async ({ request }) => {

	let data;
	try {
		data = await request.json();
	} catch {
		throw error(400, 'Failed to parse JSON');
	}

	const bearerToken = request.headers.get('Authorization');
	if (!bearerToken) throw error(401, 'No Bearer Token Provided');
	const key = bearerToken.split(' ')[1]; // Removes the 'Bearer' Prefix
	if (key != TASKMATE_API_KEY) throw error(401, 'Unauthorized');

	if (data.date == null) {
		throw error(400, 'Provide a date');
	}

	let target_date;
	if (Object.hasOwn(data, 'date')) {
		target_date = dayjs(data.date)
	} else {
		target_date = dayjs()
	}

	let return_data: AgendaData = {
		agenda_data: await getAgenda(target_date),
		events_data: await getEvents(target_date),
		tasks_data: await getTasks(target_date),
	}

	return json(return_data);
};
