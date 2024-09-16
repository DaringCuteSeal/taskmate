<script lang="ts">
import { getContext } from "svelte";
import dayjs from "dayjs";
const i18n = getContext("i18n");
import localizedFormat from "dayjs/plugin/localizedFormat";

export let date: string | null = null;

let date_dayjs = dayjs(date);
// TODO: print based on locale
$: calendar_date = date_dayjs.format("YYYY-MM-DD");

function refresh_page(target_date: string)
{
	window.location.href = `/viewer?date=${target_date}`

}

</script>

<div class="title-div">
	<span class="date-title">{$i18n.t("agenda_for")}</span>
	<input class="date-picker" type="date" on:change={ ()=>{refresh_page(calendar_date)}} bind:value="{calendar_date}">
</div>

<style>
.title-div {
	text-align: center;
	margin: 1em;

}
.date-title {
	font-size: 2.4em;
	font-weight: bold;
	margin-right: 0.3em;
}

.date-picker {
	height: 1.3em;
	font-size: 1.5em;
}
</style>
