app.controller('CreateProductCtrl',['$scope', '$location', 'identity', 'products', 'notifier', function($scope, $location, identity, products, notifier) {

    $scope.create = function(product) {
        products.create(product).then(function() {
            notifier.success('You successfully created a product!');
            $location.path('/');
        })
    };
}]);

