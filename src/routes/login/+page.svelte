<script lang="ts">
	import type { PageData } from './$types';
	
	export let data: PageData;

</script>

<p>{data.session_id}</p>

<form method="POST" action="?/login">
	<label>
		Username
		<input name="username" type="text">
	</label>
	<label>
		Password
		<input name="password" type="password">
	</label>
	<button>Login</button>
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
	<button>Register</button>
</form>
