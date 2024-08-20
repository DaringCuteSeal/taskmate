import { Dayjs } from "dayjs"
import { TinyColor } from "@ctrl/tinycolor";

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
	subject: string,
	description: string,
	due: Dayjs,
}
