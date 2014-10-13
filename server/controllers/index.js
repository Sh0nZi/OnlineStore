'use strict';

var usersController = require('../controllers/usersController');
var productsController = require('../controllers/productsController');
var commentsController = require('../controllers/commentsController');
var ordersController = require('../controllers/ordersController');

module.exports = {
    users: usersController,
    products: productsController,
    comments: commentsController,
    orders: ordersController
};
