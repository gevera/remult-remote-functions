import { getTasksTotalNumber } from '$lib/services/tasks.remote';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    const total = await getTasksTotalNumber();
    // return { total: 1 };
    return { total };
}) satisfies PageServerLoad;