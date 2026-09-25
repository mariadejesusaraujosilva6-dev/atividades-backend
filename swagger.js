const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",

        info: {
            title: "PROJECT API",
            version: "1.0.0",
            description: "Documentação da API da Atividade 2"
        },

        servers: [
            {
                url: "http://localhost:3000",
                description: "Servidor local"
            }
        ],

        tags: [
            {
                name: "Profiles",
                description: "Operações relacionadas aos perfis"
            },
            {
                name: "Technologies",
                description: "Operações relacionadas às tecnologias"
            },
            {
                name: "Projects",
                description: "Operações relacionadas aos projetos"
            },
            {
                name: "Feedback",
                description: "Avaliações e comentários dos projetos"
            }
        ],

        paths: {

            // =========================
            // PROFILES
            // =========================

            "/api/profiles": {
                post: {
                    tags: ["Profiles"],
                    summary: "Criar um perfil",

                    requestBody: {
                        required: true,

                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ProfileInput"
                                }
                            }
                        }
                    },

                    responses: {
                        201: {
                            description: "Perfil criado com sucesso"
                        },

                        400: {
                            description: "Dados inválidos"
                        }
                    }
                }
            },

            "/api/profiles/{id}": {
                get: {
                    tags: ["Profiles"],
                    summary: "Buscar um perfil pelo ID",

                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,

                            schema: {
                                type: "integer"
                            }
                        }
                    ],

                    responses: {
                        200: {
                            description: "Perfil encontrado"
                        },

                        404: {
                            description: "Perfil não encontrado"
                        }
                    }
                }
            },

            // =========================
            // TECHNOLOGIES
            // =========================

            "/api/technologies": {
                post: {
                    tags: ["Technologies"],
                    summary: "Criar uma tecnologia",

                    requestBody: {
                        required: true,

                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/TechnologyInput"
                                }
                            }
                        }
                    },

                    responses: {
                        201: {
                            description: "Tecnologia criada com sucesso"
                        },

                        400: {
                            description: "Dados inválidos"
                        }
                    }
                },

                get: {
                    tags: ["Technologies"],
                    summary: "Listar tecnologias",

                    responses: {
                        200: {
                            description: "Lista de tecnologias"
                        }
                    }
                }
            },

            "/api/technologies/project": {
                post: {
                    tags: ["Technologies"],
                    summary: "Associar uma tecnologia a um projeto",

                    requestBody: {
                        required: true,

                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ProjectTechnologyInput"
                                }
                            }
                        }
                    },

                    responses: {
                        201: {
                            description: "Tecnologia associada ao projeto"
                        },

                        400: {
                            description: "Dados obrigatórios não informados"
                        }
                    }
                }
            },

            // =========================
            // PROJECTS
            // =========================

            "/api/projects": {
                post: {
                    tags: ["Projects"],
                    summary: "Criar um projeto",

                    requestBody: {
                        required: true,

                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ProjectInput"
                                }
                            }
                        }
                    },

                    responses: {
                        201: {
                            description: "Projeto criado com sucesso"
                        },

                        400: {
                            description: "Dados inválidos"
                        }
                    }
                },

                get: {
                    tags: ["Projects"],
                    summary: "Listar projetos",

                    parameters: [
                        {
                            name: "technology",
                            in: "query",
                            required: false,

                            schema: {
                                type: "string"
                            },

                            example: "Node.js"
                        },

                        {
                            name: "page",
                            in: "query",
                            required: false,

                            schema: {
                                type: "integer",
                                minimum: 1,
                                default: 1
                            },

                            example: 1
                        },

                        {
                            name: "limit",
                            in: "query",
                            required: false,

                            schema: {
                                type: "integer",
                                minimum: 1,
                                default: 10
                            },

                            example: 2
                        }
                    ],

                    responses: {
                        200: {
                            description: "Lista de projetos"
                        },

                        400: {
                            description: "Parâmetros inválidos"
                        }
                    }
                }
            },

            "/api/projects/{id}/upvote": {
                put: {
                    tags: ["Projects"],
                    summary: "Adicionar um upvote ao projeto",

                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,

                            schema: {
                                type: "integer"
                            },

                            example: 1
                        }
                    ],

                    responses: {
                        200: {
                            description: "Upvote realizado com sucesso"
                        },

                        404: {
                            description: "Projeto não encontrado"
                        }
                    }
                }
            },

            // =========================
            // FEEDBACK
            // =========================

            "/api/projects/{id}/feedbacks": {
                post: {
                    tags: ["Feedback"],
                    summary: "Adicionar feedback a um projeto",

                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,

                            schema: {
                                type: "integer"
                            },

                            example: 1
                        }
                    ],

                    requestBody: {
                        required: true,

                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/FeedbackInput"
                                }
                            }
                        }
                    },

                    responses: {
                        201: {
                            description: "Feedback criado e média atualizada"
                        },

                        400: {
                            description: "Dados inválidos"
                        },

                        404: {
                            description: "Projeto não encontrado"
                        }
                    }
                }
            }
        },

        // =========================
        // SCHEMAS
        // =========================

        components: {
            schemas: {

                ProfileInput: {
                    type: "object",

                    required: [
                        "name",
                        "email"
                    ],

                    properties: {
                        name: {
                            type: "string",
                            example: "Maria Jecilene"
                        },

                        email: {
                            type: "string",
                            format: "email",
                            example: "maria@email.com"
                        },

                        bio: {
                            type: "string",
                            example: "Desenvolvedora de sistemas"
                        },

                        github_url: {
                            type: "string",
                            format: "uri",
                            example: "https://github.com/usuario"
                        },

                        linkedin_url: {
                            type: "string",
                            format: "uri",
                            example: "https://linkedin.com/in/usuario"
                        }
                    }
                },

                TechnologyInput: {
                    type: "object",

                    required: [
                        "name"
                    ],

                    properties: {
                        name: {
                            type: "string",
                            example: "Node.js"
                        },

                        description: {
                            type: "string",
                            example: "Runtime JavaScript"
                        }
                    }
                },

                ProjectInput: {
                    type: "object",

                    required: [
                        "title",
                        "profile_id"
                    ],

                    properties: {
                        title: {
                            type: "string",
                            example: "Raquel API"
                        },

                        description: {
                            type: "string",
                            example: "API desenvolvida para a Atividade 2"
                        },

                        project_url: {
                            type: "string",
                            format: "uri",
                            example: "https://meuprojeto.vercel.app"
                        },

                        repository_url: {
                            type: "string",
                            format: "uri",
                            example: "https://github.com/usuario/projeto"
                        },

                        profile_id: {
                            type: "integer",
                            example: 1
                        }
                    }
                },

                FeedbackInput: {
                    type: "object",

                    required: [
                        "rating",
                        "comment"
                    ],

                    properties: {
                        rating: {
                            type: "integer",
                            minimum: 1,
                            maximum: 5,
                            example: 5
                        },

                        comment: {
                            type: "string",
                            example: "Projeto muito interessante!"
                        }
                    }
                },

                ProjectTechnologyInput: {
                    type: "object",

                    required: [
                        "projectId",
                        "technologyId"
                    ],

                    properties: {
                        projectId: {
                            type: "integer",
                            example: 1
                        },

                        technologyId: {
                            type: "integer",
                            example: 1
                        }
                    }
                }
            }
        }
    },

    apis: []
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;