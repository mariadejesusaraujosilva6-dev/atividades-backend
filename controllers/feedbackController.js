const feedbackService = require("../services/feedbackService");

async function createFeedback(req, res, next) {
    try {
        const { id } = req.params;
        const { rating, comment } = req.body;

        // Validação dos dados recebidos
        if (
            rating === undefined ||
            rating === null ||
            !Number.isInteger(Number(rating)) ||
            Number(rating) < 1 ||
            Number(rating) > 5
        ) {
            const error = new Error(
                "A nota deve ser um número inteiro entre 1 e 5."
            );

            error.status = 400;
            throw error;
        }

        if (!comment || comment.trim() === "") {
            const error = new Error(
                "O comentário é obrigatório."
            );

            error.status = 400;
            throw error;
        }

        const result = await feedbackService.createFeedback(
            id,
            {
                rating: Number(rating),
                comment
            }
        );

        return res.status(201).json(result);

    } catch (error) {
        next(error);
    }
}

module.exports = {
    createFeedback
};