const pool = require("../config/database");

async function checkStructure() {
    try {
        const result = await pool.query(`
            SELECT
                table_name,
                column_name,
                data_type
            FROM information_schema.columns
            WHERE table_schema = 'public'
              AND table_name IN ('projects', 'feedbacks')
            ORDER BY table_name, ordinal_position;
        `);

        console.table(result.rows);

    } catch (error) {
        console.error("ERRO AO CONSULTAR A ESTRUTURA:");
        console.error(error.message);

    } finally {
        await pool.end();
    }
}

checkStructure();