"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupabaseService = void 0;
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
const transformers_1 = require("@xenova/transformers");
let SupabaseService = class SupabaseService {
    constructor() {
        this.client = new pg_1.Client({
            connectionString: process.env.DATABASE_URL,
        });
        this.client.connect();
    }
    async getExtractor() {
        if (!this.extractor) {
            this.extractor = await (0, transformers_1.pipeline)('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
        }
        return this.extractor;
    }
    async buscarProductos(termino) {
        const extractor = await this.getExtractor();
        const output = await extractor(termino, { pooling: 'mean', normalize: true });
        const embedding = Array.from(output.data);
        const result = await this.client.query('SELECT * FROM buscar_por_similitud($1, $2)', [`[${embedding.join(',')}]`, 3]);
        return result.rows;
    }
};
exports.SupabaseService = SupabaseService;
exports.SupabaseService = SupabaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], SupabaseService);
//# sourceMappingURL=supabase.service.js.map