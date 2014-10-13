app.controller('OrdersCtrl', ["$scope","$route", "identity", "OrdersResource","notifier", function($scope, $route,identity, OrdersResource,notifier) {
    $scope.identity = identity;
    $scope.request = {
        page: 0
    };

    $scope.orders = OrdersResource.query($scope.request);

    $scope.previousPage = function() {
        if ($scope.request.page > 0) {
            $scope.request.page--;
            $scope.isLastPage = false;
            $scope.filter($scope.request);
        }
    };

    $scope.onSearchChange = function (request) {
        OrdersResource.query(request)
            .$promise
            .then(function(orders) {
                $scope.orders = orders;
            });
    };

    $scope.nextPage = function() {
        $scope.request.page++;
        $scope.filter($scope.request);
        if($scope.orders.length){
            $scope.isLastPage=true;
        }

    };
    $scope.filter = function(request) {
        console.log(request);
        OrdersResource.query(request)
            .$promise
            .then(function(orders) {
                $scope.orders = orders;
            });
    };

    $scope.deleteOrder = function(orderId) {
        OrdersResource.remove({id: orderId.toString()}, function () {
                notifier.success("Order deleted.");
                $route.reload();
            }, function (response) {
                notifier.error(response);
            });
    };

}]);
