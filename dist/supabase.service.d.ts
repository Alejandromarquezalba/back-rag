export declare class SupabaseService {
    private client;
    private extractor;
    constructor();
    private getExtractor;
    buscarProductos(termino: string): Promise<any[]>;
}
