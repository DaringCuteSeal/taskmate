<script lang="ts">
import getI18nStore from "$lib/locales/i18n"
import { setContext } from "svelte";

setContext('i18n', getI18nStore());

</script>

<main>
	<slot />
</main>
