import { error, redirect } from '@sveltejs/kit';
import { form, getRequestEvent, query } from '$app/server';
import { standardSchema, repo } from 'remult';
import { Task } from '$lib/entities';
import { route } from '$lib/ROUTES';
import * as v from 'valibot';

export const getAllTasks = query(async () => {
	return await repo(Task).find();
});

export const getTasksTotalNumber = query(async () => {
	const total = await repo(Task).count();
	return total;
});

export const getTask = query(
	standardSchema(repo(Task), 'id'), // Standard Schema in query works
	async ({ id }) => {
		const task = await repo(Task).findFirst({ id });
		if (!task) error(404, 'Not found');
		return task;
	}
);

export const createTask = form(
	// standardSchema(repo(Task), 'title'),
	v.object({ title: v.string() }),
	async ({ title }) => {
		await repo(Task).insert({ title });

		await getAllTasks();
	}
);

export const deleteTask = form(async () => {
	const {
		params: { id }
	} = getRequestEvent();
	await repo(Task).delete({ id });
	return redirect(307, route('/tasks'));
});
