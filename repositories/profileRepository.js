const pool = require("../config/database");

async function createProfile(profile) {
    const { name, email, bio, github_url, linkedin_url } = profile;

    const result = await pool.query(
        `
        INSERT INTO profiles
        (name, email, bio, github_url, linkedin_url)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
        `,
        [name, email, bio, github_url, linkedin_url]
    );

    return result.rows[0];
}

async function findProfileById(id) {
    const result = await pool.query(
        `
        SELECT *
        FROM profiles
        WHERE id = $1;
        `,
        [id]
    );

    return result.rows[0];
}

module.exports = {
    createProfile,
    findProfileById
};