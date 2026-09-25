const pool = require("../config/database");

async function checkTables() {
    try {
        const result = await pool.query(`
            SELECT table_name
            FROM information_schema.tables
            WHERE table_schema = 'public'
            ORDER BY table_name;
        `);

        console.log("TABELAS ENCONTRADAS:");

        result.rows.forEach(row => {
            console.log("-", row.table_name);
        });

    } catch (error) {
        console.error("ERRO:", error.message);

    } finally {
        await pool.end();
    }
}

checkTables();