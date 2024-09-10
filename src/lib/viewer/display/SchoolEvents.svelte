<script lang="ts">
import type { SchoolEvent } from "$lib/server/notion/serializer";
import { getContext } from "svelte";
import { getColorHex } from "./get_colors"
const i18n = getContext("i18n");

export let events: Array<SchoolEvent> | null = null;
</script>

<h1>
	<i class="fa-solid fa-book-bookmark"></i>
	{ $i18n.t("viewer:events") }
</h1>

{#if events != null }
	<div class="table-div">
		<table>
			<thead>
				<tr>
					<th scope="col">#</th>
					<th scope="col">{ $i18n.t("viewer:category") }</th>
					<th scope="col">{ $i18n.t("viewer:subject") }</th>
					<th scope="col">{ $i18n.t("viewer:event") }</th>
					<th scope="col">{ $i18n.t("viewer:material") }</th>
				</tr>


			</thead>
			<tbody>
				{#each events as event_item, idx }
					<tr>
						<th>
							{ idx + 1 }
						</th>
						<td>
							<span class="viewer-infobox" style="background-color: { getColorHex(event_item.category?.color) }">
								{ event_item.category?.title ?? "-"}
							</span>
						</td>
						<td>

							<span class="viewer-infobox" style="background-color: { getColorHex(event_item.subject?.color) }">
								{ event_item.subject?.title ?? "-"}
							</span>
						</td>
						<td>
							{ event_item.title ?? "-" }
						</td>
						<td>
							{ event_item.material ?? "-" }
						</td>
					</tr>

				{/each}
			</tbody>
		</table>
	</div>
{:else}
	<p>
		{ $i18n.t("viewer:events_unavailable") }.
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

.table-div {
	overflow-x: auto;
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
