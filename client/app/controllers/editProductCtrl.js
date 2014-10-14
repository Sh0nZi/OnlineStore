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

    $scope.edit = function (product){
        ProductsResource.update({id:$routeParams.id.toString()}, product, function(res){
            notifier.success('Product successfully edited!');
            $location.path("product/" + $scope.routeId);
        }, function(res){
            notifier.error('Edit product failed!')
        });
    }
}]);

