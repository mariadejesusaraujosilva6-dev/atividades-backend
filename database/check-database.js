const pool = require("../config/database");

async function checkDatabase() {
    try {
        const result = await pool.query(`
            SELECT
                current_database() AS banco,
                current_user AS usuario,
                current_schema() AS schema;
        `);

        console.log("====================================");
        console.log("INFORMAÇÕES DO BANCO:");
        console.log("====================================");
        console.log("Banco:", result.rows[0].banco);
        console.log("Usuário:", result.rows[0].usuario);
        console.log("Schema:", result.rows[0].schema);
        console.log("====================================");

    } catch (error) {
        console.error("ERRO:", error);
    } finally {
        await pool.end();
    }
}

checkDatabase()