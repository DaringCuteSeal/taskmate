<script lang="ts">
import { getContext } from "svelte";
const i18n = getContext("i18n");
import type { SelectItem } from "$lib/server/notion/serializer";

export let song_and_opening: SelectItem | null = null;
export let devotional_and_closing: SelectItem | null = null;
export let end_prayer: SelectItem | null = null;

</script>

<h1>
	<i class="fa-solid fa-book-bible"></i>
	{ $i18n.t("prayer")}
</h1>

<p>
	{ $i18n.t("viewer:song_and_opening") }:
	<span class="viewer-infobox" style="background-color: { song_and_opening?.color };">
		{ song_and_opening?.title ?? "???" }
	</span>
</p>
<p>
	{ $i18n.t("viewer:devotional_and_closing") }:
	<span class="viewer-infobox" style="background-color: { devotional_and_closing?.color };">
		{ devotional_and_closing?.title ?? "???" }
	</span>
</p>
<p>
	{ $i18n.t("viewer:end_prayer") }:

	<span class="viewer-infobox" style="background-color: { end_prayer?.color };">
		{ end_prayer?.title ?? "???" }
	</span>
</p>
