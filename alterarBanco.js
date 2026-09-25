const pool = require("./config/database");

async function alterarBanco() {
    try {
        await pool.query(`
            ALTER TABLE projects
            ADD COLUMN IF NOT EXISTS average_rating NUMERIC(3,2) DEFAULT 0;

            ALTER TABLE projects
            ADD COLUMN IF NOT EXISTS upvotes INTEGER DEFAULT 0;
        `);

        console.log("Banco atualizado com sucesso!");
        console.log("Colunas average_rating e upvotes adicionadas.");
    } catch (error) {
        console.error("Erro ao atualizar o banco:", error);
    } finally {
        await pool.end();
    }
}

alterarBanco();