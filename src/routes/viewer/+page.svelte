<script lang="ts">
import type { PageData } from './$types';
import { getContext } from "svelte";
const i18n = getContext("i18n");
export let data: PageData;
</script>



{#if data.is_logged_in && data.preferences !== null }
	<h1>{ $i18n.t("preferences") }</h1>
	<p>extracurricular, wednesday: {data.preferences.extracurricular_wed}</p>
	<p>extracurricular, thursday: {data.preferences.extracurricular_thu}</p>
	<p>extracurricular, friday: {data.preferences.extracurricular_fri}</p>
	<p>subjects filter: {data.preferences.subjects_filter.toString()}</p>

	{#if data.agenda_data !== null}
		<h1>Agenda</h1>
		<p>school start: {data.agenda_data.school_start}</p>
		<p>school end: {data.agenda_data.school_end}</p>
		<p>extracurricular: {data.agenda_data.extracurricular}</p>
		<p>uniform: {data.agenda_data.uniform}</p>

		{#if data.agenda_data.morning_devotion_1}
		<p style="color: {data.agenda_data.morning_devotion_1.color}">morning devotion 1: {data.agenda_data.morning_devotion_1.title}</p>
		{/if}

		{#if data.agenda_data.morning_devotion_2}
		<p style="color: {data.agenda_data.morning_devotion_2.color}">morning devotion 2: {data.agenda_data.morning_devotion_2.title}</p>
		{/if}

		{#if data.agenda_data.end_prayer}
		<p style="color: {data.agenda_data.end_prayer.color}">end prayer: {data.agenda_data.end_prayer.title}</p>
		{/if}

		<h2>schedule:</h2>
		{#each data.agenda_data.schedule as schedule, i}
			<p>{i}: {schedule.name}, start: {schedule.start}, end: {schedule.end}, break: {schedule.break}</p>
		{/each}

	{/if}

	{#if data.events_data !== null}
		<h1>Events</h1>
		{#each data.events_data as event}
			<p>{event.title ?? "No title"}, subject: {event.subject ? event.subject.title : "No Subject"}, start: {event.start_date}, category: {event.category ? event.category.title : "no category" }, material: {event.material}</p>

		{/each}

	{/if}

	{#if data.tasks_data}
		<h1>Tasks</h1>
		{#each data.tasks_data as task}
			<p style="color: {task.subject.color}">{task.subject.title}: {task.description}, due: {task.due}</p>
		{/each}
	{/if}



{:else if !data.is_logged_in}
	<p>Not logged in.</p>
	<a href="/login">Log in</a>
{/if}
