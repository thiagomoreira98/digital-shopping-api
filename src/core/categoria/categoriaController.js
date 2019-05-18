module.exports = {
    getAll
}

function getAll(req, res) {
    const categorias = require("./categoria.json");
    res.ok(categorias);
}