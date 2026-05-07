import { Injectable } from '@nestjs/common';
import { Client } from 'pg';

@Injectable()
export class SupabaseService {
    private client: Client;

    constructor() {
        this.client = new Client({
        connectionString: process.env.DATABASE_URL,
        });
        this.client.connect();
    }

    async buscarProductos(termino: string) {
        const result = await this.client.query(
        'SELECT id, name, price FROM products WHERE name ILIKE $1 LIMIT 5',
        [`%${termino}%`]
        );
        return result.rows;
    }
}