<script lang="ts">
	import type { PageData } from './$types';
	
	export let data: PageData;

</script>

<p>{data.session_id}</p>

<h1>HI this is a test</h1>
<h2>hi this is a second header</h2>


<form method="POST" action="?/login">
	<label>
		Username
		<input name="username" type="text">
	</label>
	<label>
		Password
		<input name="password" type="password">
	</label>
	<button class="btn-blue">Login</button>
</form>

<form method="POST" action="?/register">
	<label>
		Username
		<input name="username" type="text">
	</label>
	<label>
		Password
		<input name="password" type="password">
	</label>
	<button class="btn-orange">Register</button>
</form>
