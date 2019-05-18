const writefile = require("../helpers/writefile");

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}

function getAll(req, res) {
    const produtos = require('./produto.json'),
        categorias = require('../categoria/categoria.json');

    let result = produtos.filter(p => p.nome.includes(req.query.nome || ''));

    // inner join
    result.forEach(prod => {
        categorias.forEach(cat => {
            if(prod.idCategoria == cat.id) {
                prod.nomeCategoria = cat.nome;
            }
        });
    });

    res.ok(result);
}

function getById(req, res) {
    const produtos = require('./produto.json');
    const result = produtos.find(p => p.id == req.params.id);

    if(!result)
        return res.notFound();

    res.ok(result);
}

function create(req, res) {
    const produtos = require('./produto.json');

    const produto = {
        id: produtos.length ? produtos[produtos.length - 1].id + 1 : 1,
        nome: req.body.nome,
        idCategoria: req.body.idCategoria,
        quantidade: req.body.quantidade,
        carrinho: false
    };

    produtos.push(produto);
    
    res.ok();
}

function update(req, res) {
    const produtos = require('./produto.json');

    produtos.forEach((p, i) => {
        if(p.id == req.params.id) {
            produtos.splice(i, 1, { ...req.body, carrinho: p.carrinho });
            writefile('produto', produtos);
        }
    });

    res.ok();
}

function remove(req, res) {
    const produtos = require('./produto.json');

    produtos.forEach((p, i) => {
        if(p.id == req.params.id) {
            produtos.splice(i, 1);
            writefile('produto', produtos);
        }
    });

    res.ok();  
}