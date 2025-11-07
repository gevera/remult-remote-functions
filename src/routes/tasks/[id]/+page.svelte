<script lang="ts">
	import { Task } from '$entities';
	import { route } from '$lib/ROUTES';
	import { repo } from 'remult';
	import type { PageProps } from './$types';
	import { deleteTask } from '$lib/services/tasks.remote';

	let { data, params }: PageProps = $props();
	let { task } = data;
	let remultTask = $state<Task>();
    let deleteDialog: HTMLDialogElement;

	$effect(() => {
		repo(Task)
			.findFirst({ id: params.id })
			.then((t) => (remultTask = t));
	});

    const handleCloseModal = () => deleteDialog.close()
    const handleOpenModal = () => deleteDialog.showModal()
</script>

<section>
	<h1>Single Task</h1>
	<hr />
</section>
<a href={route('/tasks')}>Back</a>

<div>
	<h4>From Page Server</h4>
	<pre>{JSON.stringify(task, null, 2)}</pre>

	<h2>{task.title}</h2>
	<hr>
	<h5>Is completed: {task.completed}</h5>
	<h5>Created at: {task.createdAt}</h5>
    <button onclick={handleOpenModal}>Delete Task</button>
</div>

<dialog bind:this={deleteDialog}>
    <h5>Are you sure you want to delete this task?</h5>
    <button onclick={handleCloseModal}>No</button>
    <form {...deleteTask}>
        <button type="submit">Yes</button>
    </form>
</dialog>

<hr />

<div>
	<h4>Remult Task</h4>
	<pre>
        {JSON.stringify(remultTask, null, 2)}
    </pre>
	<p>
		{remultTask?.createdAt}
	</p>
</div>
