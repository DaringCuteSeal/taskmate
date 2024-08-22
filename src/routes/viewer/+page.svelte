<script lang="ts">
import type { PageData } from './$types';
export let data: PageData;
</script>



<h1>Preferences</h1>



{#if data.is_logged_in && data.preferences !== undefined }
	<p>extracurricular, wednesday: {data.preferences.extracurricular_wed}</p>
	<p>extracurricular, thursday: {data.preferences.extracurricular_thu}</p>
	<p>extracurricular, friday: {data.preferences.extracurricular_fri}</p>
	<p>subjects filter: {data.preferences.subjects_filter}</p>
{:else if !data.is_logged_in}
	<p>Not logged in.</p>
	<a href="/login">Log in</a>
{/if}
