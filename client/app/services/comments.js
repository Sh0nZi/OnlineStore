app.factory('comments', function($q, $http) {
    return{
        post: function(comment, id){
            var url = "/products/" + id.toString() + "/comment"
            var deferred = $q.defer();

            $http.post(url, comment)
                .success(function(){
                    deferred.resolve();
                }, function(response){
                    deferred.reject(response);
                });

            return deferred.promise;
        },
        delete: function(productId, commentId){
            var url = "/products/" + productId.toString() + "/comment/" + commentId.toString();
            var deferred = $q.defer();

            $http.delete(url)
                .success(function(joke){
                    deferred.resolve(joke);
                }, function(response){
                    deferred.reject(response);
                })
                .error(function(response){
                    deferred.reject(response);
                });

            return deferred.promise;
        }
    }
});