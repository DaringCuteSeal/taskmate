<script lang="ts">
import { getContext } from "svelte";
const i18n = getContext("i18n");

export let uniform: String | null = "???";
</script>

<p>
	<i class="fa-solid fa-shirt"></i>
	{ $i18n.t("viewer:wear") }

	<span class="viewer-infobox bg-purple">
		{ uniform ?? "???" }
	</span>

</p>
