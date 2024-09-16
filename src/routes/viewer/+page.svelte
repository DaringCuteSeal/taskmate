<script lang="ts">
import type { PageData } from './$types';
import { getContext } from 'svelte';
import dayjs from "dayjs";

import SchoolDuration from "$lib/viewer/display/SchoolDuration.svelte";
import Uniform from '$lib/viewer/display/Uniform.svelte';
import UniformBring from "$lib/viewer/display/UniformBring.svelte";
import Schedule from "$lib/viewer/display/Schedule.svelte";
import SchoolTasks from "$lib/viewer/display/SchoolTasks.svelte";
import SchoolEvents from '$lib/viewer/display/SchoolEvents.svelte';
import Prayer from '$lib/viewer/display/Prayer.svelte';
import Notes from '$lib/viewer/display/Notes.svelte';
import Title from '$lib/viewer/display/Title.svelte';
    import LastEdit from '$lib/viewer/display/LastEdit.svelte';
const i18n = getContext("i18n");

export let data: PageData;

// Defaults if not logged in
var extracurricular = false;
$i18n.changeLanguage(data?.override_language ?? data?.preferences?.language ?? "en");

// If logged in
if (data.preferences != null)
{
	if (data.agenda_data?.extracurricular)
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
}

</script>


	<div class="title">
		<Title
			date={data.date}
		/>
	</div>

{ #if data.agenda_data != null }

	<div class="last-edit">
		<LastEdit
			last_edit={data.agenda_data?.last_edited}
		/>
	</div>
	<div class="agenda-card">

		<div class="display-card bg-school-duration">
			<SchoolDuration
				school_start={data.agenda_data?.school_start}
				school_end={data.agenda_data?.school_end}
				school_end_extracurricular={data.agenda_data?.school_end_extracurricular}
				extracurricular={extracurricular}
			/>
		</div>

		<div class="display-card bg-uniform">
			<Uniform
				uniform={data.agenda_data?.uniform}
			/>
		</div>

		<div class="display-card bg-uniform-bring">
			<UniformBring
				uniform_bring={data.agenda_data?.uniform_bring}
			/>
		</div>

		<div class="display-card bg-schedule">
			<Schedule
				schedule={data.agenda_data?.schedule}
			/>
		</div>

		<div class="display-card bg-tasks">
			<SchoolTasks
				tasks={data.tasks_data}
			/>
		</div>

		<div class="display-card bg-events">
			<SchoolEvents
				events={data.events_data}
			/>
		</div>

		<div class="display-card bg-prayer">
			<Prayer
				song_and_opening={data.agenda_data?.morning_devotion_1}
				devotional_and_closing={data.agenda_data?.morning_devotion_2}
				end_prayer={data.agenda_data?.end_prayer}
			/>
		</div>

		<div class="display-card bg-notes">
			<Notes
				notes={data.agenda_data.notes}
			/>
		</div>

	</div>
{ :else }
	<p class="empty-agenda">No agenda written.</p>
{ /if }

<style>
.title { 
	text-align: center;
	font-size: 1em;
}

.last-edit {
	text-align: center;
	color: #464646;
}

.agenda-card {
	align-self: center;
	display: flex;
	flex-direction: column;
	margin: 1% 1% 1% 1%;
}

.display-card {
	padding: 1em;
	margin-top: 5px;
	margin-bottom: 5px;
	padding-top: 9px;
	padding-bottom: 9px;
	border-radius: 10px;
}

.empty-agenda {
	text-align: center;
}
@media (prefers-color-scheme: dark)
{
	.display-card { 
		background-color: rgba(51, 57, 70, 40%);
	}
}

@media (prefers-color-scheme: light)
{
	.display-card { 
		background-color: rgba(51, 57, 70, 10%);
	}
	
}

@media print {
	.title {
		text-align: left;
		font-size: 1em;
	}

	.agenda-card {
		margin: 0% 0% 0% 0%;
	}

	.display-card {
		padding: 0px;
		margin-top: 0px;
		margin-bottom: 0px;
		padding-top: 0px;
		padding-bottom: 0px;
		border-radius: 0px;
	}
}


</style>
