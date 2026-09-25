const projectService = require("../services/projectService");

async function createFeedback(req, res, next) {
    try {
        const result = await projectService.addFeedback(
            req.params.id,
            req.body
        );

        return res.status(201).json({
            mensagem: "Feedback cadastrado com sucesso.",
            feedback: result.feedback,
            projeto: {
                id: result.project.id,
                average_rating: result.project.average_rating
            }
        });

    } catch (error) {
        next(error);
    }
}

async function upvoteProject(req, res, next) {
    try {
        const project =
            await projectService.upvoteProject(req.params.id);

        return res.status(200).json({
            mensagem: "Upvote registrado com sucesso.",
            project: {
                id: project.id,
                upvotes: project.upvotes
            }
        });

    } catch (error) {
        next(error);
    }
}

module.exports = {
    createFeedback,
    upvoteProject
};