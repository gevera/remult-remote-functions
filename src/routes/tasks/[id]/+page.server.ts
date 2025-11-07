import { Task } from '$entities';
import db from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const client = await db.connect();
	try {
		const data = await client.query(`SELECT * FROM tasks where id = $1 LIMIT 1`, [params.id]);

		console.log('TASK FETCHED ON SERVER');
		console.log(data.rows);
		console.log('==================');
		const [task] = data.rows as [Task];
		return { task };
	} finally {
		client.release()
	}
};
