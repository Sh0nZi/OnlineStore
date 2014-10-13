'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = new mongoose.Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: Schema.ObjectId,
        ref: 'Product',
        required:true
    },
    phoneNumber: String,
    address: String,
    amount: String,
    date: Date
});

var Order = mongoose.model('Order', orderSchema);
module.exports = Order;
