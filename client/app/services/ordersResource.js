app.factory('OrdersResource', function($resource) {
    var OrdersResource = $resource('orders/:id', {_id:'@id'}, { update: {method: 'PUT', isArray: false}});

    return OrdersResource;
});
