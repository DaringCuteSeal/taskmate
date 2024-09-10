<script lang="ts">
import { getContext } from "svelte";
const i18n = getContext("i18n");

export let uniform_bring: String | null = null;
</script>

<p>
	<i class="fa-solid fa-bag-shopping"></i>
	{ $i18n.t("viewer:bring_uniform") }

	<span class="viewer-infobox bg-pink">
		{ uniform_bring ?? "-" }
	</span>
</p>
