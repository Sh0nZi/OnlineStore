app.controller('UserDetailsCtrl', function($scope,$routeParams,auth, notifier,identity, UsersResource,OrdersResource) {
    $scope.identity = identity;

    var currentUser= UsersResource.get({id:$routeParams.id.toString()}, function () {
       $scope.user = currentUser;
    });


    $scope.update = function(user) {
        auth.updateOther(user,$routeParams.id).then(function(success) {
            notifier.success('User successfully updated!');
        }, function (error) {
            notifier.error('You failed to update the user info');
        });
    };
    $scope.orders= OrdersResource.query();
});

