function validateProject(data) {
    const errors = [];

    if (!data.title || data.title.trim() === "") {
        errors.push("O título do projeto é obrigatório.");
    }

    if (!data.profile_id) {
        errors.push("O profile_id é obrigatório.");
    }

    if (data.project_url && !isValidUrl(data.project_url)) {
        errors.push("A URL do projeto é inválida.");
    }

    if (data.repository_url && !isValidUrl(data.repository_url)) {
        errors.push("A URL do repositório é inválida.");
    }

    return errors;
}

function isValidUrl(value) {
    try {
        new URL(value);
        return true;
    } catch {
        return false;
    }
}

function toProjectResponse(project) {
    return {
        id: project.id,
        title: project.title,
        description: project.description,
        project_url: project.project_url,
        repository_url: project.repository_url,
        profile_id: project.profile_id,
        average_rating: project.average_rating,
        upvotes: project.upvotes,
        created_at: project.created_at
    };
}

module.exports = {
    validateProject,
    toProjectResponse
};
