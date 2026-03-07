"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const connection_1 = require("../shared/database/connection");
async function migrate() {
    try {
        const schema = (0, fs_1.readFileSync)((0, path_1.join)(__dirname, 'schema.sql'), 'utf-8');
        await connection_1.pool.query(schema);
        console.log('✅ Database migration completed successfully');
    }
    catch (error) {
        console.error('❌ Database migration failed:', error);
        process.exit(1);
    }
    finally {
        await connection_1.pool.end();
    }
}
migrate();
//# sourceMappingURL=migrate.js.map