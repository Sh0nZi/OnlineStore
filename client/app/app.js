var app = angular.module('app', ['ngResource', 'ngRoute']).value('toastr', toastr);

app.config(function($routeProvider, $locationProvider) {
    // $locationProvider.html5Mode(true);

    var routeUserChecks = {
        adminRole: {
            authenticate: function(auth) {
                return auth.isAuthorizedForRole('admin');
            }
        },
        authenticated: {
            authenticate: function(auth) {
                return auth.isAuthenticated();
            }
        }
    };

    $routeProvider
        .when('/', {
            templateUrl: '/partials/views/home',
            controller: 'MainCtrl'
        })
        .when('/product/:id/edit',{
            templateUrl:'/partials/views/edit-product',
            controller:'EditProductCtrl',
            resolve: routeUserChecks.authenticated
        })
        .when('/product/:id',{
            templateUrl:'/partials/views/product-details',
            controller:'ProductDetailsCtrl'
        })
        .when('/products',{
            templateUrl:'/partials/views/products',
            controller:'ProductsCtrl'
        })
        .when('/signup', {
            templateUrl: '/partials/views/signUp',
            controller: 'SignUpCtrl'
        })
        .when('/profile', {
            templateUrl: '/partials/views/profile',
            controller: 'ProfileCtrl',
            resolve: routeUserChecks.authenticated
        })
        .when('/create-product',{
            templateUrl:'/partials/views/create-product',
            controller:'CreateProductCtrl',
            resolve: routeUserChecks.authenticated
        })
        .when('/admin/users', {
            templateUrl: '/partials/views/users-list',
            controller: 'UserListCtrl',
            resolve: routeUserChecks.adminRole
        })
        .when('/admin/orders',{
            templateUrl:'./partials/views/orders',
            controller:'OrdersCtrl',
            resolve:routeUserChecks.adminRole
        })
        .when('/user-details/:id',{
            templateUrl:'/partials/views/user-details',
            controller:'UserDetailsCtrl',
            resolve: routeUserChecks.authenticated
        })
        .when('/unauthorized',{
           templateUrl:'/partials/views/unauthorized'
        });
});

app.run(function($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function(ev, current, previous, rejection) {
        if (rejection === 'not authorized') {
            $location.path('/unauthorized');
        }
    })
});
