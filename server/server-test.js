'use strict';

var mongoose = require('mongoose');
var config = require('./config/config');
var Joke = require('./models/Product');
var User = require('./models/User');
var jokesController = require('./controllers/productsController');

mongoose.connect(config.development.db);
User.seedInitialUsers();

var joke = {
    body: {
        user: 'pesho',
        title: 'The very first joke',
        body: 'Ne sam pesho'
    }
};

productsController.createJoke(joke,
    function(err, res){
        if (err) {
            console.log('Ooops!');
        }

        if (res) {
            console.log('Joke created');
        }
    }
);
