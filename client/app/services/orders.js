app.factory('orders', ["$http", "$q", function($http, $q) {
    return{
        create: function(order, id){
            var url = "/products/" + id.toString() + "/orders";
            var deferred = $q.defer();

            $http.post(url, order)
                .success(function(){
                    deferred.resolve();
                }, function(response){
                    deferred.reject(response);
                });

            return deferred.promise;
        }
    }
}]);

