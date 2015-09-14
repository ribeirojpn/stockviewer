var express = require('express'),
    bodyParser = require('body-parser'),
    load = require('express-load'),
    methodOverride = require('method-override');

module.exports = function(){
  var app = express();
  app.set('port', process.env.PORT || 3000);
  app.use(express.static('./public'));
  app.set('view engine','ejs');
  app.set('views','./app/views');

  app.use(bodyParser.urlencoded({extended:true}));
  app.use(bodyParser.json());
  app.use(methodOverride());

  load('models',{cwd:'app'})
    .then('controllers')
    .then('routes')
    .into(app);

  app.get('*', function(req,res){
    res.status(404).render('404');
  });

  return app;

}
