import { Client } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

async function main() {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
    });

    await client.connect();
    console.log('Conectado a Supabase');

    const { rows: productos } = await client.query(
        'SELECT id, name FROM products'
    );
    console.log(`Encontré ${productos.length} productos`);

    const { pipeline } = await import('@xenova/transformers');
    const extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');

    for (const producto of productos) {
        const output = await extractor(producto.name, { pooling: 'mean', normalize: true });
        const embedding = Array.from(output.data as Float32Array);

        await client.query(
        'UPDATE products SET embedding = $1 WHERE id = $2',
        [`[${embedding.join(',')}]`, producto.id]
        );

        console.log(`✓ Embedding generado para: ${producto.name}`);
    }

    await client.end();
    console.log('Listo!');
}

main().catch(console.error);