const controller = require('../../core/categoria/categoriaController');

module.exports = app => {

    app.route('/api/categoria')
        .get(controller.getAll)
        .post(controller.create);

    app.route('/api/categoria/:id')
        .get(controller.getById)
        .post(controller.update)
        .delete(controller.remove);
}