<script lang="ts">
import type { PageData } from './$types';
import dayjs from "dayjs";
import SchoolDuration from "$lib/viewer/display/SchoolDuration.svelte";
import Uniform from '$lib/viewer/display/Uniform.svelte';
import UniformBring from "$lib/viewer/display/UniformBring.svelte";
import Schedule from "$lib/viewer/display/Schedule.svelte";
import SchoolTasks from "$lib/viewer/display/SchoolTasks.svelte";
import SchoolEvents from '$lib/viewer/display/SchoolEvents.svelte';
import Prayer from '$lib/viewer/display/Prayer.svelte';

export let data: PageData;

var extracurricular = false;
if (data.preferences && data.agenda_data?.extracurricular)
{	
	const day_no = dayjs(data.date).day();
	switch(day_no)
		{
		case 3: if (data.preferences.extracurricular_wed)
			extracurricular = true;
			break;
		case 4: if (data.preferences.extracurricular_thu)
			extracurricular = true;
			break;
		case 5: if (data.preferences.extracurricular_fri)
			extracurricular = true;
			break;
		default:
			extracurricular = false;
			break;
	}
}

</script>


{ #if data.agenda_data != null }
	<div class="agenda-card">
		<span>
			<SchoolDuration
				school_start={data.agenda_data?.school_start}
				school_end={data.agenda_data?.school_end}
				school_end_extracurricular={data.agenda_data?.school_end_extracurricular}
				extracurricular={extracurricular}
			/>
		</span>

		<span>
			<Uniform
				uniform={data.agenda_data?.uniform}
			/>
		</span>

		<span>
			<UniformBring
				uniform_bring={data.agenda_data?.uniform_bring}
			/>
		</span>

		<span>
			<Schedule
				schedule={data.agenda_data?.schedule}
			/>
		</span>

		<span>
			<SchoolTasks
				tasks={data.tasks_data}
			/>
		</span>

		<span>
			<SchoolEvents
				events={data.events_data}
			/>
		</span>

		<span>
			<Prayer
				song_and_opening={data.agenda_data?.morning_devotion_1}
				devotional_and_closing={data.agenda_data?.morning_devotion_2}
				end_prayer={data.agenda_data?.end_prayer}
			/>
		</span>

	</div>
{ /if }
