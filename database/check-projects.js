const pool = require("../config/database");

async function checkProjects() {
    try {
        const result = await pool.query(`
            SELECT
                id,
                title,
                profile_id
            FROM projects
            ORDER BY id;
        `);

        console.table(result.rows);

    } catch (error) {
        console.error("ERRO AO CONSULTAR PROJETOS:");
        console.error(error.message);

    } finally {
        await pool.end();
    }
}

checkProjects();