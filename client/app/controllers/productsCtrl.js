app.controller('ProductsCtrl', ["$scope", "identity", "ProductsResource", function($scope, identity, ProductsResource) {
    $scope.identity = identity;
    $scope.request = {
        page: 0
    };
    $scope.products = ProductsResource.query($scope.request);

    $scope.previousPage = function() {
        if ($scope.request.page > 0) {
            $scope.request.page--;
            $scope.isLastPage=false;
            $scope.filter($scope.request);
        }
    };

    $scope.onSearchChange = function (request) {
        ProductsResource.query(request)
            .$promise
            .then(function(jokes) {
                $scope.products = jokes;
            });
    };

    $scope.nextPage = function() {
        $scope.request.page++;
        $scope.filter($scope.request);
        if($scope.products.length){
            $scope.isLastPage=true;
        }

    };
    $scope.filter = function(request) {
        ProductsResource.query(request)
            .$promise
            .then(function(products) {
                $scope.products = products;
            });
    };

}]);
