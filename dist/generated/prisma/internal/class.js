"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrismaClientClass = getPrismaClientClass;
const runtime = require("@prisma/client/runtime/client");
const config = {
    "previewFeatures": [],
    "clientVersion": "7.8.0",
    "engineVersion": "3c6e192761c0362d496ed980de936e2f3cebcd3a",
    "activeProvider": "postgresql",
    "inlineSchema": "generator client {\n  provider = \"prisma-client\"\n  output   = \"../src/generated/prisma\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n}\n\nmodel Document {\n  id        String   @id @default(cuid())\n  title     String\n  content   String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel Product {\n  id          String                 @id @default(cuid())\n  name        String\n  description String\n  price       Float\n  createdAt   DateTime               @default(now())\n  updatedAt   DateTime               @updatedAt\n  embedding   Unsupported(\"vector\")?\n}\n",
    "runtimeDataModel": {
        "models": {},
        "enums": {},
        "types": {}
    },
    "parameterizationSchema": {
        "strings": [],
        "graph": ""
    }
};
config.runtimeDataModel = JSON.parse("{\"models\":{\"Document\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"title\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"content\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"Product\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"price\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null}},\"enums\":{},\"types\":{}}");
config.parameterizationSchema = {
    strings: JSON.parse("[\"where\",\"Document.findUnique\",\"Document.findUniqueOrThrow\",\"orderBy\",\"cursor\",\"Document.findFirst\",\"Document.findFirstOrThrow\",\"Document.findMany\",\"data\",\"Document.createOne\",\"Document.createMany\",\"Document.createManyAndReturn\",\"Document.updateOne\",\"Document.updateMany\",\"Document.updateManyAndReturn\",\"create\",\"update\",\"Document.upsertOne\",\"Document.deleteOne\",\"Document.deleteMany\",\"having\",\"_count\",\"_min\",\"_max\",\"Document.groupBy\",\"Document.aggregate\",\"Product.findUnique\",\"Product.findUniqueOrThrow\",\"Product.findFirst\",\"Product.findFirstOrThrow\",\"Product.findMany\",\"Product.createOne\",\"Product.createMany\",\"Product.createManyAndReturn\",\"Product.updateOne\",\"Product.updateMany\",\"Product.updateManyAndReturn\",\"Product.upsertOne\",\"Product.deleteOne\",\"Product.deleteMany\",\"_avg\",\"_sum\",\"Product.groupBy\",\"Product.aggregate\",\"AND\",\"OR\",\"NOT\",\"id\",\"name\",\"description\",\"price\",\"createdAt\",\"updatedAt\",\"equals\",\"in\",\"notIn\",\"lt\",\"lte\",\"gt\",\"gte\",\"not\",\"contains\",\"startsWith\",\"endsWith\",\"title\",\"content\",\"set\",\"increment\",\"decrement\",\"multiply\",\"divide\"]"),
    graph: "ThMgCCwAAEMAMC0AAAQAEC4AAEMAMC8BAAAAATNAAEEAITRAAEEAIUABAD8AIUEBAD8AIQEAAAABACABAAAAAQAgCCwAAEMAMC0AAAQAEC4AAEMAMC8BAD8AITNAAEEAITRAAEEAIUABAD8AIUEBAD8AIQADAAAABAAgAwAABQAwBAAAAQAgAwAAAAQAIAMAAAUAMAQAAAEAIAMAAAAEACADAAAFADAEAAABACAFLwEAAAABM0AAAAABNEAAAAABQAEAAAABQQEAAAABAQgAAAkAIAUvAQAAAAEzQAAAAAE0QAAAAAFAAQAAAAFBAQAAAAEBCAAACwAwAQgAAAsAMAUvAQBJACEzQABLACE0QABLACFAAQBJACFBAQBJACECAAAAAQAgCAAADgAgBS8BAEkAITNAAEsAITRAAEsAIUABAEkAIUEBAEkAIQIAAAAEACAIAAAQACACAAAABAAgCAAAEAAgAwAAAAEAIA8AAAkAIBAAAA4AIAEAAAABACABAAAABAAgAxUAAEwAIBYAAE4AIBcAAE0AIAgsAABCADAtAAAXABAuAABCADAvAQA0ACEzQAA2ACE0QAA2ACFAAQA0ACFBAQA0ACEDAAAABAAgAwAAFgAwFAAAFwAgAwAAAAQAIAMAAAUAMAQAAAEAIAksAAA-ADAtAAAdABAuAAA-ADAvAQAAAAEwAQA_ACExAQA_ACEyCABAACEzQABBACE0QABBACEBAAAAGgAgAQAAABoAIAksAAA-ADAtAAAdABAuAAA-ADAvAQA_ACEwAQA_ACExAQA_ACEyCABAACEzQABBACE0QABBACEAAwAAAB0AIAMAAB4AMAQAABoAIAMAAAAdACADAAAeADAEAAAaACADAAAAHQAgAwAAHgAwBAAAGgAgBi8BAAAAATABAAAAATEBAAAAATIIAAAAATNAAAAAATRAAAAAAQEIAAAiACAGLwEAAAABMAEAAAABMQEAAAABMggAAAABM0AAAAABNEAAAAABAQgAACQAMAEIAAAkADAGLwEASQAhMAEASQAhMQEASQAhMggASgAhM0AASwAhNEAASwAhAgAAABoAIAgAACcAIAYvAQBJACEwAQBJACExAQBJACEyCABKACEzQABLACE0QABLACECAAAAHQAgCAAAKQAgAgAAAB0AIAgAACkAIAMAAAAaACAPAAAiACAQAAAnACABAAAAGgAgAQAAAB0AIAUVAABEACAWAABHACAXAABGACAoAABFACApAABIACAJLAAAMwAwLQAAMAAQLgAAMwAwLwEANAAhMAEANAAhMQEANAAhMggANQAhM0AANgAhNEAANgAhAwAAAB0AIAMAAC8AMBQAADAAIAMAAAAdACADAAAeADAEAAAaACAJLAAAMwAwLQAAMAAQLgAAMwAwLwEANAAhMAEANAAhMQEANAAhMggANQAhM0AANgAhNEAANgAhDhUAADgAIBYAAD0AIBcAAD0AIDUBAAAAATYBAAAABDcBAAAABDgBAAAAATkBAAAAAToBAAAAATsBAAAAATwBADwAIT0BAAAAAT4BAAAAAT8BAAAAAQ0VAAA4ACAWAAA7ACAXAAA7ACAoAAA7ACApAAA7ACA1CAAAAAE2CAAAAAQ3CAAAAAQ4CAAAAAE5CAAAAAE6CAAAAAE7CAAAAAE8CAA6ACELFQAAOAAgFgAAOQAgFwAAOQAgNUAAAAABNkAAAAAEN0AAAAAEOEAAAAABOUAAAAABOkAAAAABO0AAAAABPEAANwAhCxUAADgAIBYAADkAIBcAADkAIDVAAAAAATZAAAAABDdAAAAABDhAAAAAATlAAAAAATpAAAAAATtAAAAAATxAADcAIQg1AgAAAAE2AgAAAAQ3AgAAAAQ4AgAAAAE5AgAAAAE6AgAAAAE7AgAAAAE8AgA4ACEINUAAAAABNkAAAAAEN0AAAAAEOEAAAAABOUAAAAABOkAAAAABO0AAAAABPEAAOQAhDRUAADgAIBYAADsAIBcAADsAICgAADsAICkAADsAIDUIAAAAATYIAAAABDcIAAAABDgIAAAAATkIAAAAAToIAAAAATsIAAAAATwIADoAIQg1CAAAAAE2CAAAAAQ3CAAAAAQ4CAAAAAE5CAAAAAE6CAAAAAE7CAAAAAE8CAA7ACEOFQAAOAAgFgAAPQAgFwAAPQAgNQEAAAABNgEAAAAENwEAAAAEOAEAAAABOQEAAAABOgEAAAABOwEAAAABPAEAPAAhPQEAAAABPgEAAAABPwEAAAABCzUBAAAAATYBAAAABDcBAAAABDgBAAAAATkBAAAAAToBAAAAATsBAAAAATwBAD0AIT0BAAAAAT4BAAAAAT8BAAAAAQksAAA-ADAtAAAdABAuAAA-ADAvAQA_ACEwAQA_ACExAQA_ACEyCABAACEzQABBACE0QABBACELNQEAAAABNgEAAAAENwEAAAAEOAEAAAABOQEAAAABOgEAAAABOwEAAAABPAEAPQAhPQEAAAABPgEAAAABPwEAAAABCDUIAAAAATYIAAAABDcIAAAABDgIAAAAATkIAAAAAToIAAAAATsIAAAAATwIADsAIQg1QAAAAAE2QAAAAAQ3QAAAAAQ4QAAAAAE5QAAAAAE6QAAAAAE7QAAAAAE8QAA5ACEILAAAQgAwLQAAFwAQLgAAQgAwLwEANAAhM0AANgAhNEAANgAhQAEANAAhQQEANAAhCCwAAEMAMC0AAAQAEC4AAEMAMC8BAD8AITNAAEEAITRAAEEAIUABAD8AIUEBAD8AIQAAAAAAAUIBAAAAAQVCCAAAAAFDCAAAAAFECAAAAAFFCAAAAAFGCAAAAAEBQkAAAAABAAAAAAAAAAMVAAYWAAcXAAgAAAADFQAGFgAHFwAIAAAABRUADhYAERcAEigADykAEAAAAAAABRUADhYAERcAEigADykAEAECAQIDAQUGAQYHAQcIAQkKAQoMAgsNAwwPAQ0RAg4SBBETARIUARMVAhgYBRkZCRobChscChwfCh0gCh4hCh8jCiAlAiEmCyIoCiMqAiQrDCUsCiYtCicuAioxDSsyEw"
};
async function decodeBase64AsWasm(wasmBase64) {
    const { Buffer } = await Promise.resolve().then(() => require('node:buffer'));
    const wasmArray = Buffer.from(wasmBase64, 'base64');
    return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
    getRuntime: async () => await Promise.resolve().then(() => require("@prisma/client/runtime/query_compiler_fast_bg.postgresql.js")),
    getQueryCompilerWasmModule: async () => {
        const { wasm } = await Promise.resolve().then(() => require("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.js"));
        return await decodeBase64AsWasm(wasm);
    },
    importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
    return runtime.getPrismaClient(config);
}
//# sourceMappingURL=class.js.map