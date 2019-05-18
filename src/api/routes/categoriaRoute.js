const controller = require('../../core/categoria/categoriaController');

module.exports = app => {

    app.route('/api/categorias')
        .get(controller.getAll)
}