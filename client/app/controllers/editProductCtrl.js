app.controller('EditProductCtrl', ["$scope", "$location", "$routeParams", "identity", "auth", "ProductsResource", "notifier", function($scope, $location, $routeParams, identity, auth, ProductsResource, notifier) {
    $scope.routeId = $routeParams.id.toString();

    var product = ProductsResource.get({id:$routeParams.id.toString()}, function() {
        $scope.product = product;

        if ((auth.isAuthorizedForRole('admin') !== true) && (identity.currentUser._id !== $scope.joke.user._id)){
            $location.path("product/" + $scope.routeId);
        }
    }, function(){
        $scope.invalidUrl = true;
    });

    $scope.edit = function editPost(joke){
        ProductsResource.update({id:$routeParams.id.toString()}, joke, function(res){
            $location.path("product/" + $scope.routeId);
        }, function(res){
            notifier.error('Edit product failed!')
        });
    }
}]);

