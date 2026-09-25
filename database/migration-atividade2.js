const pool = require("../config/database");

async function runMigration() {
    try {
        await pool.query(`
            ALTER TABLE projects
            ADD COLUMN IF NOT EXISTS average_rating NUMERIC(3,2) DEFAULT 0,
            ADD COLUMN IF NOT EXISTS upvotes INTEGER DEFAULT 0;
        `);

        console.log("====================================");
        console.log("MIGRAÇÃO DA ATIVIDADE 2 EXECUTADA!");
        console.log("Campos adicionados em projects:");
        console.log("- average_rating");
        console.log("- upvotes");
        console.log("====================================");

    } catch (error) {
        console.error("ERRO AO EXECUTAR A MIGRAÇÃO:");
        console.error(error.message);

    } finally {
        await pool.end();
    }
}

runMigration();