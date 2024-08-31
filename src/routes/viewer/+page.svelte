<script lang="ts">
import type { PageData } from './$types';
import dayjs from "dayjs";
import SchoolDuration from "$lib/viewer/display/SchoolDuration.svelte"
export let data: PageData;

var extracurricular = false;
if (data.preferences)
{	
	const day_no = dayjs(data.date).day();
	switch(day_no)
		{
		case 3: if (data.preferences.extracurricular_wed)
			extracurricular = true;
			break;
		case 4: if (data.preferences.extracurricular_thu)
			extracurricular = true;
			break;
		case 5: if (data.preferences.extracurricular_fri)
			extracurricular = true;
			break;
		default:
			extracurricular = false;
			break;
	}
}

</script>


<div class="agenda-card">

	<div>
		<SchoolDuration
			school_start={data.agenda_data?.school_start}
			school_end={data.agenda_data?.school_end}
			school_end_extracurricular={data.agenda_data?.school_end_extracurricular}
			extracurricular={extracurricular}
		/>
	</div>


</div>
