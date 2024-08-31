<script lang="ts">
import type { Task } from "$lib/server/notion/serializer";
import { getContext } from "svelte";
import Time from "@radulucut/relative";
const i18n = getContext("i18n");

export let tasks: Array<Task> | null = null;

/* Generate human-readable dates */
let readable_due_dates: Array<string> = []
if (tasks != null)
{
	const time = Time(navigator.language);
	for (let i = 0; i < tasks.length; i++)
	{
		let due = tasks[i].due;
		if (due != null)
			readable_due_dates.push(time.Relative(new Date(due)))
			else
			readable_due_dates.push("-")
	}
}

</script>

<h1>
	<i class="fa-solid fa-list-check"></i>
	{ $i18n.t("viewer:tasks") }
</h1>

{#if tasks != null }
	<table>
		<thead>
			<tr>
				<th scope="col">#</th>
				<th scope="col">{ $i18n.t("viewer:subject") }</th>
				<th scope="col">{ $i18n.t("viewer:task") }</th>
				<th scope="col">{ $i18n.t("viewer:due") }</th>
				<th scope="col">{ $i18n.t("viewer:status") }</th>
			</tr>


		</thead>
		<tbody>
			{#each tasks as task_item, idx }
				<tr>
					<th>
						{ idx + 1 }
					</th>
					<td>
						<span class="viewer-infobox" style="background-color: {task_item.subject?.color ?? "none;"}">
							{ task_item.subject?.title }
						</span>
					</td>
					<td>
						{ task_item.description ?? "-" }
					</td>
					<td>
						{ readable_due_dates[idx] }
					</td>
					<td>
						WIP
					</td>

				</tr>

			{/each}
		</tbody>
	</table>
{:else}
	<p>
		{ $i18n.t("viewer:schedule_unavailable") }.
	</p>

{/if}
<style>
table {
	border-collapse: collapse;
	border: 2px solid rgb(140 140 140);
	font-family: sans-serif;
	font-size: 0.8rem;
	letter-spacing: 1px;
}

@media (prefers-color-scheme: dark)
{

	thead {
		color: #DADFEB;
		background-color: rgba(77, 105, 148, 100);
	}

	th, td {
		border: 1px solid rgb(160 160 160);
		padding: 8px 10px;
	}
}

@media (prefers-color-scheme: light)
{

	thead {
		color: #DADFEB;
		background-color: rgba(77, 105, 148, 100);
	}

	th, td {
		border: 1px solid rgb(20 20 20);
		padding: 8px 10px;
	}
}


</style>
