'use strict';

var url = require('url');
var Product = require('../models/Product');
var Order = require('../models/Order');
var PRODUCTS_PER_PAGE = 10;

function createOrder(req, res) {
    var id = req.param('id');
    if (!id) {
        res.status(400).send('Bad request');
        return;
    }

    Product.findOne({_id: id},
        function (err, product) {
            if (err) {
                res.status(404).send('Product with this id does not exist');
                return;
            }

            var order = new Order();
            order.user = req.user._id;
            order.amount = product.price;
            order.phoneNumber = req.body.phoneNumber;
            order.address = req.body.address;
            order.product = id;
            order.date = new Date();
            order.save(function (err, result) {
                if (err) {
                    res.status(500).send(err.message);
                }
                else {
                    res.send(result);
                }
            });

        });
}

function getOrders(req, res) {
    var query = url.parse(req.url, true).query;
    var currentPage = query.page || 0;

    var result = Order.find();

    if (query.sort) {
        var orderPrefix = '-';
        if (query.orderBy && query.orderBy === 'asc') {
            orderPrefix = '';
        }
        switch (query.sort) {
            case 'amount':
                result = result.sort(orderPrefix + 'amount');
                break;
            case 'date':
                result = result.sort(orderPrefix + 'date');
                break;
            default:
                res.status(400).send('Bad request');
                break;
        }
    }

    result.select({})
        .skip(PRODUCTS_PER_PAGE * currentPage)
        .limit(PRODUCTS_PER_PAGE)
        .populate('user', '_id username')
        .populate('product', '_id name image')
        .exec(function (err, products) {
            if (err) {
                res.status(500).send(err.message);
                return;
            }
            res.send(products);
        });
}

function getOrderById(req, res) {
    var id = req.param('id');
    if (!id) {
        res.status(400).send('Bad request');
        return;
    }

    Order.findOne({_id: id}).
        populate('user', '_id username').
        populate('product', '_id name image').
        exec(function (err, order) {
            if (err) {
                res.status(404).send('Order with this id does not exist');
                return;
            }

            res.send(order);
        });
}


function deleteOrder(req, res) {
    var id = req.param('id');
    if (!id) {
        res.status(400).send('Bad request');
        return;
    }

    if (req.user.roles.indexOf('admin') < 0) {
        res.status(403).send('Operation not allowed');
        return;
    }

    Order.remove({_id: id},
        function (err, order) {
            if (err) {
                res.status(404).send('Order with this id does not exist');
            }
            else {
                res.send();
            }
        }
    );
}

module.exports = {
    createOrder: createOrder,
    getOrders: getOrders,
    getOrderById: getOrderById,
    deleteOrder: deleteOrder
};
