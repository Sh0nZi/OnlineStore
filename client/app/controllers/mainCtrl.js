app.controller('MainCtrl', function($scope, $location,ProductsResource ,auth, identity) {
    $scope.identity=identity;
    $scope.request = {
        sort:'date',
        page: 0
    };
    $scope.products = ProductsResource.query($scope.request);
});
