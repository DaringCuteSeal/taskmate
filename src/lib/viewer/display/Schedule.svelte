<script lang="ts">
import type { ScheduleItem } from "$lib/server/notion/serializer";
import { getContext } from "svelte";
const i18n = getContext("i18n");

export let schedule: Array<ScheduleItem> | null = null;
</script>

<h1>
	<i class="fa-solid fa-book-bookmark"></i>
	{ $i18n.t("viewer:schedule") }
</h1>

{#if schedule != null }
<table>
	<thead>
		<tr>
			<th scope="col">#</th>
			<th scope="col">{ $i18n.t("viewer:time") }</th>
			<th scope="col">{ $i18n.t("viewer:subject") }</th>
		</tr>


	</thead>
	<tbody>
		{#each schedule as sched_item, idx }
			<tr>
				{#if sched_item.break }
					<th scope="row" colspan="3">
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
