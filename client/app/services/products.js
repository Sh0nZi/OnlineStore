app.factory('products', ["$http", "$q", "ProductsResource", function($http, $q,  ProductsResource) {
    return{
        create: function(product) {
            var deferred = $q.defer();

            var product = new ProductsResource(product);
            product.$save().then(function() {
                deferred.resolve();
            }, function(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }
    }
}]);

