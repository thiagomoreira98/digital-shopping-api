const controller = require('../../core/produto/produtoController');

module.exports = (app) => {

    app.route('/api/produtos')
        .get(controller.getAll)
        .post(controller.create);

    app.route('/api/produtos/:id')
        .get(controller.getById)
        .put(controller.update)
        .delete(controller.remove);
}