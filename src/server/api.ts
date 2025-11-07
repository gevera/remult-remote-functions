import { Task } from '$lib/entities/Task';
import { remultApi } from 'remult/remult-sveltekit';
import { env } from '$env/dynamic/private';

export const api = remultApi({
	entities: [Task],
	admin: env.WORKING_ENV === 'dev'
});
