<script lang="ts">
import getI18nStore from "$lib/locales"
import { setContext } from "svelte";

setContext('i18n', getI18nStore());

</script>

<main>
	<slot />
</main>
