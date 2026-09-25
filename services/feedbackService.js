const pool = require("../config/database");

async function findProjectById(projectId) {
    const result = await pool.query(
        `
        SELECT *
        FROM projects
        WHERE id = $1;
        `,
        [projectId]
    );

    return result.rows[0];
}

async function createFeedback(feedback) {
    const {
        rating,
        comment,
        project_id
    } = feedback;

    const result = await pool.query(
        `
        INSERT INTO feedbacks
        (rating, comment, project_id)
        VALUES ($1, $2, $3)
        RETURNING *;
        `,
        [
            rating,
            comment,
            project_id
        ]
    );

    return result.rows[0];
}

async function calculateAverageRating(projectId) {
    const result = await pool.query(
        `
        SELECT AVG(rating) AS average_rating
        FROM feedbacks
        WHERE project_id = $1;
        `,
        [projectId]
    );

    return Number(
        result.rows[0].average_rating || 0
    );
}

async function updateProjectAverageRating(
    projectId,
    averageRating
) {
    const result = await pool.query(
        `
        UPDATE projects
        SET average_rating = $1
        WHERE id = $2
        RETURNING *;
        `,
        [
            averageRating,
            projectId
        ]
    );

    return result.rows[0];
}

module.exports = {
    findProjectById,
    createFeedback,
    calculateAverageRating,
    updateProjectAverageRating
};