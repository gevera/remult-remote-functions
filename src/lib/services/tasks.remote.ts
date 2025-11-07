import { error, redirect } from '@sveltejs/kit';
import { form, getRequestEvent, query } from '$app/server';
import { standardSchema, repo } from 'remult';
import { Task } from '$lib/entities';
import * as v from 'valibot';
import { withRemultApi } from '$lib/utils/remoteFunctionsRemultWrapper';
import { route } from '$lib/ROUTES';

export const getAllTasks = query(async () => {
	const tasks = await withRemultApi(Task, (task) => task.find());
	return tasks;
});

export const getTasksTotalNumber = query(async () => {
	const total = await withRemultApi(Task, (task) => task.count());
	return total;
});

export const getTask = query(
	standardSchema(repo(Task), 'id'), // Standard Schema in query works
	async ({ id }) => {
		const task = await withRemultApi(Task, (task) => task.findFirst({ id }));
		if (!task) error(404, 'Not found');
		return task;
	}
);

export const createTask = form(
	standardSchema(repo(Task), 'title'),
	// v.object({ title: v.string() }),
	async ({ title }) => {
		await withRemultApi(Task, async (task) => {
			const data = await task.insert({ title });
			console.log(data);
		});

		await getAllTasks();
	}
);

export const deleteTask = form(async () => {
	const {
		params: { id }
	} = getRequestEvent();
	await withRemultApi(Task, async (task) => {
		const data = task.delete({ id });
		console.log(data);
	});
	return redirect(307, route('/tasks'));
});
