const pool = require("../config/database");
const feedbackRepository = require("../repositories/feedbackRepository");

async function addFeedback(projectId, data) {

    const projectResult = await pool.query(
        "SELECT id FROM projects WHERE id = $1",
        [projectId]
    );

    if (projectResult.rows.length === 0) {
        const error = new Error("Projeto não encontrado.");
        error.statusCode = 404;
        throw error;
    }

    if (
        !Number.isInteger(Number(data.rating)) ||
        Number(data.rating) < 1 ||
        Number(data.rating) > 5
    ) {
        const error = new Error(
            "A nota deve ser um número entre 1 e 5."
        );

        error.statusCode = 400;
        throw error;
    }

    if (!data.name || data.name.trim() === "") {
        const error = new Error("O nome é obrigatório.");

        error.statusCode = 400;
        throw error;
    }

    if (!data.comment || data.comment.trim() === "") {
        const error = new Error("O comentário é obrigatório.");

        error.statusCode = 400;
        throw error;
    }

    const feedback =
        await feedbackRepository.createFeedback({
            name: data.name,
            comment: data.comment,
            rating: Number(data.rating),
            project_id: projectId
        });

    const project =
        await feedbackRepository.updateProjectAverage(
            projectId
        );

    return {
        feedback,
        project
    };
}


async function upvoteProject(projectId) {

    const query = `
        UPDATE projects
        SET upvotes = upvotes + 1
        WHERE id = $1
        RETURNING *
    `;

    const result = await pool.query(
        query,
        [projectId]
    );

    if (result.rows.length === 0) {
        const error = new Error("Projeto não encontrado.");

        error.statusCode = 404;
        throw error;
    }

    return result.rows[0];
}


module.exports = {
    addFeedback,
    upvoteProject
};