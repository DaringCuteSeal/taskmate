<script lang="ts">
import { getContext } from "svelte";
const i18n = getContext("i18n");

export let school_start: String | null = "???";
export let school_end: String | null = "???";
export let school_end_extracurricular: String | null = "???";
export let extracurricular: boolean | null = false;
</script>

<p>
	<i class="fa-solid fa-clock"></i>
	{ $i18n.t("viewer:school_start") }

	<span class="viewer-infobox bg-orange">
		{school_start ?? "???"}
	</span>

	-

	{#if extracurricular}
		<span class="viewer-infobox bg-blue">
			{school_end_extracurricular ?? "???"}
		</span>

		<span class="viewer-infobox bg-green">
			({ $i18n.t("viewer:extracurricular") })
		</span>
	{:else}
		<span class="viewer-infobox bg-blue">
			{school_end ?? "???"}
		</span>
	{/if}


</p>
