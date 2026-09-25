function validateProfile(data) {
    const errors = [];

    if (!data || !data.name || data.name.trim() === "") {
        errors.push("O nome é obrigatório.");
    }

    if (!data || !data.email || data.email.trim() === "") {
        errors.push("O email é obrigatório.");
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(data.email)) {
            errors.push("O email deve ser válido.");
        }
    }

    if (data && data.portfolio_url) {
        try {
            new URL(data.portfolio_url);
        } catch {
            errors.push("A URL do portfólio deve ser válida.");
        }
    }

    if (data && data.github_url) {
        try {
            new URL(data.github_url);
        } catch {
            errors.push("A URL do GitHub deve ser válida.");
        }
    }

    if (data && data.linkedin_url) {
        try {
            new URL(data.linkedin_url);
        } catch {
            errors.push("A URL do LinkedIn deve ser válida.");
        }
    }

    return errors;
}

function toProfileResponse(profile) {
    return {
        id: profile.id,
        name: profile.name,
        email: profile.email,
        bio: profile.bio,
        portfolio_url: profile.portfolio_url,
        github_url: profile.github_url,
        linkedin_url: profile.linkedin_url,
        created_at: profile.created_at
    };
}

module.exports = {
    validateProfile,
    toProfileResponse
};