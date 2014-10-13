'use strict';

var Product = require('../models/Product');
var Comment = require('../models/Comment');

function createComment(req, res) {
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

            var comment = new Comment();
            comment.user = req.user._id;
            comment.text = req.body.text;
            comment.date = new Date();
            product.comments.push(comment);
            product.save(function (err, result) {
                if (err) {
                    res.status(500).send(err.message);
                }
                else {
                    res.send(result);
                }
            });
        });
}

function deleteComment(req, res) {
    var id = req.param('id');
    var commentId = req.param('commentId');

    if (!(id && commentId)) {
        res.status(400).send('Bad request');
        return;
    }

    if (req.user.roles.indexOf('admin') < 0) {
        res.status(403).send('Operation not allowed');
        return;
    }

    Product.findOne({_id: id},
        function (err, product) {
            if (err) {
                res.status(404).send('Product with this id does not exist');
                return;
            }

            var comments = product.comments;
            var index = -1;

            for (var i = 0; i < comments.length; i++) {
                if (comments[i]._id.toString() === commentId.toString()) {
                    index = i;
                }
            }

            if (index === -1){
                res.status(404).send('Comment does not exist');
                return;
            }

            comments.splice(index, 1);
            product.save(function (err, result) {
                if (err) {
                    res.status(400).send(err.message);
                }
                else {
                    res.send(result);
                }
            });
        })
}

module.exports = {
    createComment: createComment,
    deleteComment: deleteComment
};
