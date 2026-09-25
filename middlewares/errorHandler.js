function errorHandler(error, req, res, next) {
    console.error("ERRO:", error.message);

    const status = error.status || 500;

    res.status(status).json({
        erro: error.message || "Erro interno do servidor."
    });
}

module.exports = errorHandler;
