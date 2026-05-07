import { Client } from 'pg';
import * as dotenv from 'dotenv';
dotenv.config();

const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

async function test() {
    await client.connect();
    const result = await client.query('SELECT * FROM products LIMIT 5');
    console.log('📊 Datos:', result.rows);
    await client.end();
}

test(); 