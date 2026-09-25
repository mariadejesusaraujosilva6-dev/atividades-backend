function validateTechnology(data) {
    const errors = [];

    if (!data || !data.name || data.name.trim() === "") {
        errors.push("O nome da tecnologia é obrigatório.");
    }

    return errors;
}

function toTechnologyResponse(technology) {
    return {
        id: technology.id,
        name: technology.name,
        created_at: technology.created_at
    };
}

module.exports = {
    validateTechnology,
    toTechnologyResponse
};