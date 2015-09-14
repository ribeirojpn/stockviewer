var http = require('http'),
    express = require('express'),
    app = require('./config/express')();
require('./config/database')(process.env.MONGOLAB_URI || 'mongodb://localhost/stockviewer');

http.createServer(app).listen(app.get('port'), function() {
  console.log('Server on...');
});
