app.controller('ProductDetailsCtrl', ["$scope", "$location", "$routeParams", "$route", "ProductsResource", "orders","comments", "auth", "identity", "notifier", function($scope, $location, $routeParams, $route, ProductsResource,orders, comments, auth, identity, notifier) {
    $scope.identity = identity;
    var product = ProductsResource.get({id:$routeParams.id.toString()}, function() {
        $scope.product = product;

        if (identity.currentUser){
            $scope.canEdit = (auth.isAuthorizedForRole('admin') === true);
        }

    }, function(){
        $scope.invalidUrl = true;
    });

    $scope.isAdmin = auth.isAuthorizedForRole('admin') === true;

    $scope.deleteProduct = function(){
        ProductsResource.remove({id:$routeParams.id.toString()}, function(){
            notifier.success('You have deleted a product!');
            $location.path("/products");
        }, function(error){
            console.log(error);
        })
    };

    $scope.deleteComment = function(commentId){
        comments.delete($routeParams.id, commentId)
            .then(function(joke){
                notifier.success("Comment deleted.");
                $scope.joke = joke;
            }, function(response){
                notifier.error(response);
            });
    };

    $scope.enablePostComment = function enablePostComment(){
        $scope.enablePost = true;
    };

    $scope.cancelComment = function cancelComment(){
        $scope.enablePost = false;
    };

    $scope.postComment = function postComment(comment){
        if (comment && comment.text) {
            comments.post(comment, $routeParams.id).then(
                function () {
                    notifier.success("Comment post successful!");
                    $scope.cancelComment();
                    $route.reload();
                },
                function () {
                    notifier.error("Post comment failed.");
                }
            )
        } else {
            notifier.error("Comment field must not be empty!");
        }
    };

    $scope.enableOrderForm = function enableOrderForm(){
        $scope.enableOrder = true;
    };

    $scope.cancelOrder= function cancelOrder(){
        $scope.enableOrder = false;
    };

    $scope.sendOrder = function sendOrder(order){
        if (order && order.address && order.phoneNumber) {
            orders.create(order, $routeParams.id).then(
                function () {
                    notifier.success("Order send successfully!");
                    $scope.cancelComment();
                    $route.reload();
                },
                function () {
                    notifier.error("Order send failed.");
                }
            )
        } else {
            notifier.error("Both fields must correctly filled!");
        }
    };
}]);
