<script lang="ts">
import type { SchoolEvent } from "$lib/server/notion/serializer";
import { getContext } from "svelte";
import { getColorHex } from "./get_colors"
const i18n = getContext("i18n");

export let notes: Array<string> | null = null;
</script>

<h1>
	<i class="fa-solid fa-pen-to-square"></i>
	{ $i18n.t("viewer:notes") }
</h1>

{#if notes != null }
	<p>
		{#each notes as line }
			{ line }
			<br>
		{/each}
	</p>
{:else}
	<p>
		{ $i18n.t("viewer:notes_unavailable") }.
	</p>

{/if}
