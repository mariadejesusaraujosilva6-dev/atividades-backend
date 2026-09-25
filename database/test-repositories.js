const profileRepository = require("../repositories/profileRepository");
const technologyRepository = require("../repositories/technologyRepository");
const projectRepository = require("../repositories/projectRepository");

async function testRepositories() {
    try {
        console.log("====================================");
        console.log("TESTANDO REPOSITORIES");
        console.log("====================================");

        const technologies = await technologyRepository.findAllTechnologies();

        console.log("Tecnologias encontradas:");
        console.log(technologies);

        const projects = await projectRepository.findAllProjects();

        console.log("Projetos encontrados:");
        console.log(projects);

        console.log("====================================");
        console.log("REPOSITORIES FUNCIONANDO!");
        console.log("====================================");

    } catch (error) {
        console.error("ERRO AO TESTAR REPOSITORIES:");
        console.error(error);
    }
}

testRepositories();