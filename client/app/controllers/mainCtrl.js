app.controller('MainCtrl', function($scope, $location,ProductsResource ,auth, identity) {
    $scope.request = {
        sort:'date',
        page: 0
    };
    $scope.products = ProductsResource.query($scope.request);
});
