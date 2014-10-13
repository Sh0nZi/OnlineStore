app.factory('ProductsResource', function($resource) {
    var ProductsResource = $resource('products/:id', {_id:'@id'}, { update: {method: 'PUT', isArray: false}});

    return ProductsResource;
})
