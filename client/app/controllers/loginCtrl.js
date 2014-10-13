app.controller('LoginCtrl', function($scope, $location, $route, notifier, identity, auth) {
    $scope.identity = identity;
//    $scope.user = {
//        firstName: identity.currentUser.firstName,
//        lastName: identity.currentUser.lastName,
//        avatar:identity.currentUser.avatar
//    };
    $scope.login = function(user) {
        auth.login(user).then(function(success) {
            if (success) {
                notifier.success('Successful login!');

                user.lastLog=new Date();
                auth.updateLogTime(user).then(function () {
                    $route.reload();
                });
            }
            else {
                notifier.error('Username/Password combination is not valid!');
            }
        });
    };

    $scope.logout = function() {
        auth.logout().then(function() {
            notifier.success('Successful logout!');
            if ($scope.user) {
                $scope.user.username = '';
                $scope.user.password = '';
            }
            $location.path('/');
        })
    };
});

