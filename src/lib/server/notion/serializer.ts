import dayjs from "dayjs"
import { queryAgendaNotion, queryCalendarNotion, queryTasksNotion } from "$lib/server/notion/notion_loader"
import { parse as yamlParse } from "yaml";

type SelectItem = {
	title: string
	color: string

}

export type ScheduleItem = {
	name: string,
	start: string,
	end: string,
	break: boolean,

}

export type Agenda = {
	school_start: string | null,
	school_end: string | null,
	school_end_extracurricular: string | null,
	extracurricular: boolean;
	uniform: string,
	uniform_bring: string | null; 
	schedule: Array<ScheduleItem> | null;

	morning_devotion_1: SelectItem | null;
	morning_devotion_2: SelectItem | null;
	end_prayer: SelectItem | null;

}

export type Task = {
	subject: SelectItem | null,
	description: string,
	due: dayjs.Dayjs,
}

export type SchoolEvent = {
	title: string,
	subject: SelectItem | null,
	start_date: string | null,
	category: SelectItem | null,
	material: string,
}

function parseSchedule(data: string): Array<ScheduleItem>
{
	try
	{
		const yaml_data = yamlParse(data);
		const schedule_items: Array<ScheduleItem> = [];
		yaml_data.forEach((item: any) => {
			let schedule_item: ScheduleItem = {
				name: item.name,
				start: item.start,
				end: item.end,
				break: item.break
			}
			schedule_items.push(schedule_item)

		})
		return schedule_items;
	}
	catch (e) {
		return [];
	}


}
export async function getAgenda(date: dayjs.Dayjs): Promise<Agenda | null>
{
	// TODO: error handling?
	if (!date.isValid)
		return null;

	const agenda_query = await queryAgendaNotion(date);

	if (agenda_query.results.length == 0)
		
		return null

	if (!('properties' in agenda_query.results[0]))
	{
		return null
	}

	const agenda_data: any = agenda_query.results[0].properties; // HACK: sorry, i really don't wanna check the attributes one-by-one
	const schedule_data_url = agenda_data.Schedule?.files[0]?.file?.url;
	var schedule_data: string = "";
	if (!(schedule_data_url === undefined))
{
		const schedule_fetch = await fetch(schedule_data_url);
		schedule_data = await schedule_fetch.text();
	}

	return {
		school_start: agenda_data.Start?.rich_text[0]?.text?.content,
		school_end: agenda_data.End?.rich_text[0]?.text?.content,
		school_end_extracurricular: agenda_data.End_Extracurricular?.rich_text[0].text?.content,
		extracurricular: agenda_data.Extracurricular?.checkbox,
		uniform: agenda_data.Uniform?.select?.name,
		uniform_bring: agenda_data.Bring_Uniform?.select?.name,
		schedule: schedule_data.length > 0 ? parseSchedule(schedule_data) : null,
		end_prayer: agenda_data.End_Prayer?.select ? {
			title: agenda_data.End_Prayer.select.name,
			color: agenda_data.End_Prayer.select.color
		} : null,
		morning_devotion_1: agenda_data.Morning_Devotion_1.select ? {
			title: agenda_data.Morning_Devotion_1.select.name,
			color: agenda_data.Morning_Devotion_1.select.color
		} : null,
		morning_devotion_2: agenda_data.Morning_Devotion_2.select ? {
		title: agenda_data.Morning_Devotion_2.select.name,
		color: agenda_data.Morning_Devotion_2.select.color
		} : null,

	};


}

export async function getTasks(date: dayjs.Dayjs): Promise<Array<Task> | null>
{
	// TODO: error handling?
	if (!date.isValid)
		return null;

	const tasks_query = await queryTasksNotion(date);

	if (tasks_query.results.length == 0)
		return null

	const tasks: Array<Task> = [];

	tasks_query.results.forEach((item: any) => { // HACK: more hack
		let task_item: Task = {
			description: item.properties.Task?.title[0]?.text?.content,
			subject: item.properties.Subject?.select ? {
				title: item.properties.Subject.select.name,
				color: item.properties.Subject.select.color
			} : null,
			due: item.properties.Due?.date.start,
		}
		tasks.push(task_item);
	});

	return tasks;
	
}

export async function getEvents(date: dayjs.Dayjs): Promise<Array<SchoolEvent> | null>
{
	// TODO: error handling?
	if (!date.isValid)
		return null;

	const events_query = await queryCalendarNotion(date);

	if (events_query.results.length == 0)
		return null

	const school_events: Array<SchoolEvent> = [];
	events_query.results.forEach((item: any) => { // HACK: even more hack
		let event_item: SchoolEvent = {
			title: item.properties.Name?.rich_text?.content,
			start_date: item.properties.Date?.date?.start,
			subject: item.properties.Subject?.select ? {
				title: item.properties.Subject.select.name,
				color: item.properties.Subject.select.color
			} : null, 
			category: item.properties.Category?.select ? {
				title: item.properties.Category.select.name,
				color: item.properties.Category.select.color
			} : null,
			material: item.properties["Material"].rich_text?.content
		}
		school_events.push(event_item);
	});

	return school_events;
}

