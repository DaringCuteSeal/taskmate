import dayjs, { Dayjs } from "dayjs"
import { TinyColor } from "@ctrl/tinycolor";
import { queryAgendaNotion, queryCalendarNotion, queryTasksNotion } from "$lib/server/notion/notion_loader"
import { parse as yamlParse } from "yaml";

class SelectItem {
	title: string
	color: TinyColor

	constructor (title: string, color: string)
	{
		this.title = title,
		this.color = new TinyColor(color)

	}

}

type ScheduleItem = {
	name: string
	start: Dayjs,
	end: Dayjs,
	break: boolean,

}

type Agenda = {
	schoolStart: Dayjs,
	schoolEnd: Dayjs,
	extracurricular: boolean;
	uniform: string,
	uniformBring: string | null; 
	schedule: Array<ScheduleItem>

	morningDevotion1: SelectItem;
	morningDevotion2: SelectItem;
	endPrayer: SelectItem;

}

type Task = {
	subject: SelectItem,
	description: string,
	due: Dayjs,
}

type SchoolEvent = {
	subject: SelectItem,
	start_date: Dayjs,
	category: SelectItem,
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
export async function getAgenda(date: Dayjs): Promise<Agenda | null>
{
	const agenda_query = await queryAgendaNotion(date);

	if (agenda_query.results.length == 0)
		return null

	if (!('properties' in agenda_query.results[0]))
	{
		return null
	}

	const agenda_data: any = agenda_query.results[0].properties; // HACK: sorry, i really don't wanna check the attributes one-by-one
	const schedule_data_url = agenda_data["Schedule"].files[0].url
	const schedule_fetch = await fetch(schedule_data_url);
	const schedule_data = await schedule_fetch.text();

	return {
		schoolStart: dayjs(agenda_data["Start"].rich_text[0].text.content),
		schoolEnd: dayjs(agenda_data["End"].rich_text[0].text.content),
		extracurricular: agenda_data["Extracurricular"].checkbox,
		uniform: agenda_data["Uniform"].select.name,
		uniformBring: agenda_data["Bring Uniform"].select.name,
		schedule: parseSchedule(schedule_data),
		endPrayer: new SelectItem(agenda_data["End Prayer"].select.name, agenda_data["End Prayer"].select.color),
		morningDevotion1: new SelectItem(agenda_data["Morning Devotion 1"].select.name, agenda_data["Morning Devotion 1"].select.color),
		morningDevotion2: new SelectItem(agenda_data["Morning Devotion 2"].select.name, agenda_data["Morning Devotion 2"].select.color),

	};


}

export async function getTasks(date: Dayjs): Promise<Array<Task> | null>
{
	const tasks_query = await queryTasksNotion(date);

	if (tasks_query.results.length == 0)
		return null

	const tasks: Array<Task> = [];

	tasks_query.results.forEach((item: any) => { // HACK: more hack
		let task_item: Task = {
			subject: new SelectItem(item.properties["Subject"].select.name, item.properties["Subject"].select.color),
			due: dayjs(item.properties["Due"].date.start),
			description: item.properties["Task"].title[0].text.content
		}
		tasks.push(task_item);
	});

	return tasks;
	
}

export async function getEvents(date: Dayjs): Promise<Array<SchoolEvent> | null>
{

	const events_query = await queryCalendarNotion(date);


	if (events_query.results.length == 0)
		return null

	const school_events: Array<SchoolEvent> = [];
	events_query.results.forEach((item: any) => { // HACK: even more hack
		let event_item: SchoolEvent = {
			start_date: dayjs(item.properties["Date"].date.start),
			subject: new SelectItem(item.properties["Subject"].select.name, item.properties["Subject"].select.color), 
			category: new SelectItem(item.properties["Category"].select.name, item.properties["Category"].select.color),
			material: item.properties["Material"].rich_text.text.content
		}
		school_events.push(event_item);
	});

	return school_events;
}

