import { Task } from '$lib/entities/Task';
import { remultApi } from 'remult/remult-sveltekit';
import { env } from '$env/dynamic/private';
import { createPostgresDataProvider } from 'remult/postgres';
import { DATABASE_URL } from '$env/static/private';

export const api = remultApi({
	entities: [Task],
	dataProvider: DATABASE_URL
		? createPostgresDataProvider({ connectionString: DATABASE_URL })
		: undefined,
	admin: env.WORKING_ENV === 'dev'
});
