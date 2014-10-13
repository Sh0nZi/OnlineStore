var path = require('path');
var rootPath = path.normalize(__dirname + '/../../')

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost:27017/Store',
        port: process.env.PORT || 3030
    },
	production:{
		rootPath: rootPath,
		db:'mongodb://shonzi:abc123321cba@ds035740.mongolab.com:35740/mariaalexievajewlelry',
		port: process.env.PORT || 3030
	}
};
