<script lang="ts">
import getI18nStore from "$lib/locale"
import { setContext } from "svelte";

setContext('i18n', getI18nStore());

</script>

<main>
	<!-- +page.svelte is rendered in this <slot> -->
	<slot />
</main>
