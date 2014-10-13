'use strict';

var auth = require('./auth');
var controllers = require('../controllers');
var cors = require('express-cors');

module.exports = function (app) {
    // Enable CORS
    app.use(cors({allowedOrigins: ['*']}));

    app.post('/login', auth.login);
    app.post('/logout', auth.logout);

    app.route('/api/users')
        .get(auth.isInRole('admin'), controllers.users.getAllUsers)
        .post(controllers.users.createUser)
        .put(auth.isAuthenticated, controllers.users.updateUser);

    app.get('/api/users/:id', auth.isAuthenticated, controllers.users.getUserById);

    app.get('/partials/:partialArea/:partialName', function (req, res) {
        res.render('../../client/app/' + req.params.partialArea + '/' + req.params.partialName);
    });

    // Comment api
    app.post('/products/:id/comment', auth.isAuthenticated, controllers.comments.createComment);
    app.delete('/products/:id/comment/:commentId', auth.isInRole('admin'), controllers.comments.deleteComment);

    // Products api
    app.get('/products', controllers.products.getProducts);
    app.get('/products/:id', controllers.products.getProductById);
    app.post('/products', auth.isInRole('admin'), controllers.products.createProduct);
    app.put('/products/:id', auth.isAuthenticated, controllers.products.updateProduct);
    app.delete('/products/:id', auth.isAuthenticated, controllers.products.deleteProduct);

    // Orders api
    app.get('/orders',auth.isAuthenticated, controllers.orders.getOrders);
    app.get('/orders/:id',auth.isInRole('admin'), controllers.orders.getOrderById);
    app.post('/products/:id/orders', auth.isAuthenticated, controllers.orders.createOrder);
    app.delete('/orders/:id', auth.isInRole('admin'), controllers.orders.deleteOrder);

    app.get('/api/*', function (req, res) {
        res.status(404);
        res.end();
    });

    app.get('*', function (req, res) {
        res.render('index', {currentUser: req.user});
    });
};
