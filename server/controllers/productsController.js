'use strict';

var url = require('url');
var Product = require('../models/Product.js');

var PRODUCTS_PER_PAGE = 10;

function createProduct(req, res) {
    if (!(req.body.name && req.body.body)) {
        res.status(400).send('Bad request');
        return;
    }

    var newProduct = new Product();
    newProduct.user = req.user._id;
    newProduct.name = req.body.name;
    newProduct.body = req.body.body;
    newProduct.image=req.body.image;
    newProduct.price=req.body.price;
    newProduct.comments = [];
    newProduct.date = new Date();

    newProduct.save(function (err, result) {
        if (err) {
            res.status(400).send(err.message);
        }
        else {
            res.send(result);
        }
    });
}

function getProducts(req, res) {
    var query = url.parse(req.url, true).query;
    var currentPage = query.page || 0;

    var result = Product.find();

    if (query.name) {
        result = result.where('name').regex(new RegExp(query.name, 'i'));
    }

    if (query.sort) {
        var orderPrefix = '-';
        if (query.orderBy && query.orderBy === 'asc') {
            orderPrefix = '';
        }
        switch (query.sort) {
            case 'price':
                result = result.sort(orderPrefix + 'price');
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
        .populate('comments.user', '_id username avatar')
        .exec(function (err, products) {
            if (err) {
                res.status(500).send(err.message);
                return;
            }

            res.send(products);
        });
}

function getProductById(req, res) {
    var id = req.param('id');
    if (!id) {
        res.status(400).send('Bad request');
        return;
    }

    Product.findOne({_id: id}).
        populate('user', '_id username').
        populate('comments.user', '_id username avatar').
        exec(function (err, product) {
            if (err) {
                res.status(404).send('Product with this id does not exist');
                return;
            }

            res.send(product);
        });
}

function updateProduct(req, res) {
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

            if (joke.user.toString() !== req.user._id.toString()) {
                res.status(403).send('Only author can edit a product');
                return;
            }

            console.log(req.body);
            product.title = req.body.title || product.title;
            product.body = req.body.body || product.body;
            product.tags = req.body.tags || product.tags;
            product.save(function (err, result) {
                if (err) {
                    res.status(400).send(err.message);
                }
                else {
                    res.send(result);
                }
            });
        });
}

function deleteProduct(req, res) {
    var id = req.param('id');
    if (!id) {
        res.status(400).send('Bad request');
        return;
    }

    if (req.user.roles.indexOf('admin') < 0) {
        res.status(403).send('Operation not allowed');
        return;
    }

    Product.remove({_id: id},
        function (err, product) {
            if (err) {
                res.status(404).send('Product with this id does not exist');
            }
            else {
                res.send();
            }
        }
    );
}

module.exports = {
    createProduct: createProduct,
    getProducts: getProducts,
    getProductById: getProductById,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct
};
