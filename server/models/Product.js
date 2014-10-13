'use strict';

var mongoose = require('mongoose');
var Comment = require('../models/Comment.js');

// Todo: validation and user ref
var productSchema = new mongoose.Schema({
    name: String,
    body: String,
    price: String,
    image: String,
    comments: [Comment.schema],
    date: Date
});

var Product = mongoose.model('Product', productSchema);
module.exports = Product;
