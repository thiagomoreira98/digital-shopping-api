const controller = require('../../core/carrinho/carrinhoController');

module.exports = (app) => {

    app.route('/api/carrinho')
        .get(controller.get)
        .post(controller.create)
        .delete(controller.removeAll);

    app.route('/api/carrinho/:id')
        .put(controller.update)
        .delete(controller.removeById);
}