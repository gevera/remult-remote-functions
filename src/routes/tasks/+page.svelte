<script lang="ts">
	import { route } from '$lib/ROUTES';
	import { getAllTasks, createTask } from '$lib/services/tasks.remote';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<section>
	<h1>All Tasks</h1>
</section>
<h3>Total tasks: {data.total}</h3>
<a href={route('/')}>Back</a>

<form {...createTask}>
	<input type="text" name="title" required placeholder="What do you want to do next" />
	<button type="submit">Add</button>
</form>

<div>
	<ul>
		{#each await getAllTasks() as { title, id }, idx (id)}
			<li id={idx}>
				<!-- <a href={route('/tasks/[id]', { id })}> -->
				<a href={`/tasks/${id}`}>
					{title}
				</a>
			</li>
		{/each}
	</ul>
</div>
