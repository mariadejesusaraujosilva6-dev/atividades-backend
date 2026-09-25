const technologyRepository = require("../repositories/technologyRepository");
const {
    validateTechnology,
    toTechnologyResponse
} = require("../dtos/technologyDTO");

async function createTechnology(req, res) {
    try {
        const errors = validateTechnology(req.body);

        if (errors.length > 0) {
            return res.status(400).json({
                errors
            });
        }

        const technology =
            await technologyRepository.createTechnology(req.body);

        return res.status(201).json(
            toTechnologyResponse(technology)
        );

    } catch (error) {
        console.error("Erro ao criar tecnologia:", error);

        return res.status(500).json({
            error: "Erro interno ao criar tecnologia."
        });
    }
}

async function getAllTechnologies(req, res) {
    try {
        const technologies =
            await technologyRepository.findAllTechnologies();

        return res.status(200).json(
            technologies.map(toTechnologyResponse)
        );

    } catch (error) {
        console.error("Erro ao buscar tecnologias:", error);

        return res.status(500).json({
            error: "Erro interno ao buscar tecnologias."
        });
    }
}

module.exports = {
    createTechnology,
    getAllTechnologies
};