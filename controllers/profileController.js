const profileRepository = require("../repositories/profileRepository");
const {
    validateProfile,
    toProfileResponse
} = require("../dtos/profileDTO");

async function createProfile(req, res) {
    try {
        const errors = validateProfile(req.body);

        if (errors.length > 0) {
            return res.status(400).json({
                errors
            });
        }

        const profile = await profileRepository.createProfile(req.body);

        return res.status(201).json(
            toProfileResponse(profile)
        );

    } catch (error) {
        console.error("Erro ao criar perfil:", error);

        return res.status(500).json({
            error: "Erro interno ao criar perfil."
        });
    }
}

async function getProfileById(req, res) {
    try {
        const { id } = req.params;

        const profile = await profileRepository.findProfileById(id);

        if (!profile) {
            return res.status(404).json({
                error: "Perfil não encontrado."
            });
        }

        return res.status(200).json(
            toProfileResponse(profile)
        );

    } catch (error) {
        console.error("Erro ao buscar perfil:", error);

        return res.status(500).json({
            error: "Erro interno ao buscar perfil."
        });
    }
}

module.exports = {
    createProfile,
    getProfileById
};