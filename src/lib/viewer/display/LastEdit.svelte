<script lang="ts">
import { getContext } from "svelte";
import Time from "@radulucut/relative";
const i18n = getContext("i18n");

export let last_edit: string | null = null;
const time = Time($i18n.language ?? "en");
const readable_date = time.Relative(new Date(last_edit ?? ""));
</script>

{#if last_edit}
	<p class="last-edit">
		{ $i18n.t("viewer:last_edit") }: { readable_date }
	</p>
{:else}
	<p>
		{ $i18n.t("viewer:last_edit") }: ???
	</p>
{/if}

<style>
.last-edit {
	color: #7A7A7A;
}
</style>
