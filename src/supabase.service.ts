import { Injectable } from '@nestjs/common';
import { Client } from 'pg';
import { pipeline } from '@xenova/transformers';

@Injectable()
export class SupabaseService {
    private client: Client;
    private extractor: any;

    constructor() {
        this.client = new Client({
        connectionString: process.env.DATABASE_URL,
        });
        this.client.connect();
    }

    private async getExtractor() {
        if (!this.extractor) {
        this.extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
        }
        return this.extractor;
    }

    async buscarProductos(termino: string) {
        const extractor = await this.getExtractor();
        const output = await extractor(termino, { pooling: 'mean', normalize: true });
        const embedding = Array.from(output.data as Float32Array);

        const result = await this.client.query(
        'SELECT * FROM buscar_por_similitud($1, $2)',
        [`[${embedding.join(',')}]`, 3]
        );

        return result.rows;
    }
}