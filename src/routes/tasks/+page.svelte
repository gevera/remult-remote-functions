<script lang="ts">
	import { Task } from '$entities';
	import { route } from '$lib/ROUTES';
	import { repo } from 'remult';
	let tasks = $state<Task[]>([]);
	let title = $state('');

	$effect(() => {
		return repo(Task)
			.liveQuery()
			.subscribe((info) => {
				tasks = info.applyChanges(tasks);
			});
	});

	const addTask = async (e: Event) => {
		e.preventDefault();
		await repo(Task).insert({ title });
		title = '';
	};
</script>

<section>
	<h1>All Tasks</h1>
</section>
<a href={route('/')}>Back</a>

<form onsubmit={addTask}>
	<input
		type="text"
		name="title"
		required
		placeholder="What do you want to do next"
		bind:value={title}
	/>
	<button type="submit">Add</button>
</form>

<div>
	<ul>
		{#each tasks as { title, id, completed }, idx (id)}
			<li id={idx}>
				<a href={route('/tasks/[id]', { id })}>
					<span>{completed ? 'V' : 'X'}</span>
					<span class:crossed={completed}>
						{title}
					</span>
				</a>
			</li>
		{/each}
	</ul>
</div>

<style>
	.crossed {
		text-decoration: line-through;
	}
</style>
