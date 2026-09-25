const fs = require("fs");
const path = require("path");

const pool = require("../config/database");

async function runSchema() {
    try {
        const schemaPath = path.join(__dirname, "schema.sql");

        const schema = fs.readFileSync(schemaPath, "utf8");

        await pool.query(schema);

        console.log("====================================");
        console.log("SCHEMA EXECUTADO COM SUCESSO!");
        console.log("Tabelas criadas no PostgreSQL.");
        console.log("====================================");

    } catch (error) {

        console.error("ERRO AO EXECUTAR O SCHEMA:");
        console.error(error.message);

    } finally {

        await pool.end();

    }
}

runSchema();