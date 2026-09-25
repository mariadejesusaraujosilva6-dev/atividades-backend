const pool = require("../config/database");

async function createTechnology(technology) {
    const { name, description } = technology;

    const result = await pool.query(
        `
        INSERT INTO technologies
        (name, description)
        VALUES ($1, $2)
        RETURNING *;
        `,
        [name, description]
    );

    return result.rows[0];
}

async function findAllTechnologies() {
    const result = await pool.query(
        `
        SELECT *
        FROM technologies
        ORDER BY id;
        `
    );

    return result.rows;
}

async function addTechnologyToProject(
    projectId,
    technologyId
) {
    const result = await pool.query(
        `
        INSERT INTO project_technologies
        (project_id, technology_id)
        VALUES ($1, $2)
        ON CONFLICT DO NOTHING
        RETURNING *;
        `,
        [
            projectId,
            technologyId
        ]
    );

    return result.rows[0];
}

module.exports = {
    createTechnology,
    findAllTechnologies,
    addTechnologyToProject
};