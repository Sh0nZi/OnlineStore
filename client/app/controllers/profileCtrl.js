app.controller('ProfileCtrl', function($scope, $location, auth, identity, notifier , OrdersResource) {
    $scope.identity=identity;
    $scope.user = {
        avatar:identity.currentUser.avatar
    };

    $scope.update = function(user) {
        auth.update(user).then(function() {
            $scope.firstName = user.firstName;
            $scope.lastName = user.lastName;
            notifier.success('Info updated successfully!');
            $location.path('/');
        });
    };
    $scope.upload= function (user) {
        auth.uploadAvatar(user).then(function() {
            $scope.avatar=user.avatar;
            notifier.success('Avatar changed successfully!')
            $location.path('/');
        });

    };

    $scope.request = {
        page: 0,
        sort: 'date'
    };

    $scope.yourOrders = OrdersResource.query($scope.request);

    $scope.previousPage = function() {
        if ($scope.request.page > 0) {
            $scope.request.page--;
            $scope.isLastPage = false;
            $scope.filter($scope.request);
        }
    };


    $scope.nextPage = function() {
        $scope.request.page++;
        $scope.filter($scope.request);
        if($scope.yourOrders.length){
            $scope.isLastPage=true;
        }

    };
    $scope.filter = function(request) {
        OrdersResource.query(request)
            .$promise
            .then(function(orders) {
                $scope.yourOrders = orders;
            })
    };

});
