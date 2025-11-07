import { Pool } from 'pg';
import { DATABASE_URL } from '$env/static/private';

// Create a singleton pool instance
const db = new Pool({
    connectionString: DATABASE_URL
});

db.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
});

export default db;