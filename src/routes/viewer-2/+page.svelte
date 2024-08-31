<script lang="ts">
import type { PageData } from './$types';
import dayjs from "dayjs";
import { getContext } from "svelte";
const i18n = getContext("i18n");
export let data: PageData;

var extracurricular = false;
if (data.preferences)
{	
	const day_no = dayjs().day();
	switch(day_no)
		{
		case 3: if (data.preferences.extracurricular_wed)
			extracurricular = true;
		case 4: if (data.preferences.extracurricular_thu)
			extracurricular = true;
		case 5: if (data.preferences.extracurricular_fri)
			extracurricular = true;
		default:
			extracurricular = false;
	}
}

</script>

{#if data.is_logged_in && data.preferences !== null }
	{#if data.agenda_data !== null}
		<p>
			{ $i18n.t("viewer:school_start") } { data.agenda_data.school_start ?? "???" } -

			{#if extracurricular}
			{ data.agenda_data.school_end_extracurricular ?? "???" } ({data})

			{:else}
				{ data.agenda_data.school_end ?? "???" }
			{/if}
		</p>

		<p>
			{ $i18n.t("viewer:wear") } { data.agenda_data.uniform ?? "???" }
		</p>

		<p>
			{ $i18n.t("viewer:bring_uniform") } { data.agenda_data.uniform ?? "???" }
		</p>

		{#if data.agenda_data.schedule }
			<h1>{ $i18n.t("viewer:schedule") } </h1>

			<table>
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">{ $i18n.t("viewer:time") }</th>
						<th scope="col">{ $i18n.t("viewer:subject") }</th>
					</tr>


				</thead>
				<tbody>
					{#each data.agenda_data.schedule as sched_item, idx }
						<tr>
							{#if sched_item.break }
								<th scope="row" colspan="2">
									{ $i18n.t("viewer:recess") }
								</th>
							{:else}
								<th>
									{ idx }
								</th>
								<td>
									{ sched_item.start } - { sched_item.end }
								</td>
								<td>
									{ sched_item.name }
								</td>
							{/if}
						</tr>

					{/each}
				</tbody>
			</table>
		{/if}


		{#if data.agenda_data.morning_devotion_1}
		<p style="color: {data.agenda_data.morning_devotion_1.color}">morning devotion 1: {data.agenda_data.morning_devotion_1.title}</p>
		{/if}

		{#if data.agenda_data.morning_devotion_2}
		<p style="color: {data.agenda_data.morning_devotion_2.color}">morning devotion 2: {data.agenda_data.morning_devotion_2.title}</p>
		{/if}

		{#if data.agenda_data.end_prayer}
		<p style="color: {data.agenda_data.end_prayer.color}">end prayer: {data.agenda_data.end_prayer.title}</p>
		{/if}

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
