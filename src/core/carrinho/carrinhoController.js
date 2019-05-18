
const writefile = require("../helpers/writefile");

module.exports = {
    get,
    create,
    update,
    removeById,
    removeAll
}

function get(req, res) {
    const carrinho = require("./carrinho.json"),
        produtos = require("../produto/produto.json"),
        categorias = require("../categoria/categoria.json");

    // inner join
    carrinho.forEach(item => {
        produtos.forEach(p => {
            if (item.idProduto == p.id) {
                item.nomeProduto = p.nome;
                item.quantidade = p.quantidade;
                item.idCategoria = p.idCategoria;
            }
        });

        categorias.forEach(cat => {
            if (item.idCategoria == cat.id) {
                item.nomeCategoria = cat.nome;
            }
        })
    });

    let result = carrinho.length ?
        carrinho.filter(item => item.nomeProduto.includes(req.query.nomeProduto || '')) :
        [];
        
    res.ok(result);
}

function create(req, res) {
    const carrinho = require("./carrinho.json"),
        produtos = require("../produto/produto.json");
        
    const item = {
        id: carrinho.length ? carrinho[carrinho.length - 1].id + 1 : 1,
        idProduto: req.body.idProduto
    };

    carrinho.push(item);
    writefile('carrinho', carrinho);

    //atualizando status do produto
    produtos.forEach((p, i) => {
        if (p.id == item.idProduto) {
            p.carrinho = true;
            writefile('produto', produtos);
        }
    })

    res.ok();
}

function update(req, res) {
    const carrinho = require("./carrinho.json");

    carrinho.forEach((c, i) => {
        if (c.id == req.params.id) {
            carrinho.splice(i, 1, req.body);
            writefile('carrinho', carrinho);
        }
    });

    res.ok();
}

function removeById(req, res) {
    const carrinho = require("./carrinho.json"),
        produtos = require("../produto/produto.json");

    carrinho.forEach((c, i) => {
        if (c.id == req.params.id) {
            carrinho.splice(i, 1);
            writefile('carrinho', carrinho);

            // resetando status do produto
            produtos.forEach(p => {
                if(p.id = c.idProduto) {
                    p.carrinho = false;
                    writefile('produto', produtos);
                }
            });
        }
    });

    res.ok(carrinho);
}

function removeAll(req, res) {
    writefile('carrinho', []);

    //resetando o status padrao dos produtos
    const produtos = require("../produto/produto.json");

    produtos.forEach(p => {
        p.carrinho = false;
    })

    writefile('produto', produtos);
    res.ok();
}