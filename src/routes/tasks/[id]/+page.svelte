<script lang="ts">
	import { Task } from '$entities';
	import { route } from '$lib/ROUTES';
	import { repo } from 'remult';
	import type { PageProps } from './$types';
	import { goto } from '$app/navigation';

	let { params }: PageProps = $props();
	let deleteDialog: HTMLDialogElement;
	let task = $state<Task>();

	$effect(() => {
		repo(Task)
			.findFirst({ id: params.id })
			.then((t) => {
				if (t) {
					task = t;
				} else {
					goto(route('/tasks'));
				}
			});
	});

	const handleCloseModal = () => deleteDialog.close();
	const handleOpenModal = () => deleteDialog.showModal();
	const setCompleted = async (task: Task, completed: boolean) => {
		await repo(Task).save({ ...task, completed });
	};
</script>

<section>
	<h1>Single Task</h1>
	<hr />
</section>
<a href={route('/tasks')}>Back</a>

<div>
	<h4>From Page Server</h4>
	<pre>{JSON.stringify(task, null, 2)}</pre>

	<h2>{task?.title}</h2>
	<hr />

	<label for="task_completed">Task Completed</label>
	<input
		type="checkbox"
		name="task_completed"
		checked={task?.completed}
		oninput={(e) => setCompleted(task, e.currentTarget.checked)}
	/>
	<h5>Created at: {task?.createdAt}</h5>
	<button onclick={handleOpenModal}>Delete Task</button>
</div>

<dialog bind:this={deleteDialog}>
	<h5>Are you sure you want to delete this task?</h5>
	<button onclick={handleCloseModal}>No</button>
	<form
		onsubmit={async (e) => {
			e.preventDefault();
			await repo(Task).delete({ id: task?.id });
			goto(route('/tasks'));
		}}
	>
		<button type="submit">Yes</button>
	</form>
</dialog>
