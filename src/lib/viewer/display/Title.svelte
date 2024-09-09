<script lang="ts">
import { getContext } from "svelte";
import dayjs from "dayjs";
const i18n = getContext("i18n");
import localizedFormat from "dayjs/plugin/localizedFormat";

export let date: string | null = null;

let date_dayjs = dayjs(date);
// TODO: print based on locale
let readable_date = date_dayjs.isValid() ? date_dayjs.format("DD/MM/YYYY") : "Unknown";

</script>

<h1>{$i18n.t("agenda_for")} {readable_date}</h1>
