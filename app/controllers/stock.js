module.exports = function(app) {
  var Stock = app.models.stock;

  var controller = {};

  controller.getStocks = function(req,res) {
    Stock.find().exec().then(function (stocks) {
      res.json(stocks);
    },function(erro) {
      res.status(404).json('Not found');
    });
  };

  controller.getStock = function(req,res) {
    var _id = req.params.id;
    Stock.findById(_id).exec().then(function (stock) {
        if (!stock) throw new Error("Stock não encontrado");
        res.json(Stock);
    }, function (erro) {
        console.log(erro);
        res.status(404).json(erro);
    });
  }

  controller.saveStock = function(req,res) {
    Stock.create(req.body).then(function(stock) {
      res.status(201).json(stock);
    },function(erro) {
      res.status(500).json(erro);
    });
  };

  controller.removeStock = function(req,res) {
    Stock.findOneAndRemove({name: req.params.name}).exec().then(
      function() {
        res.status(204).end();
    },function(erro) {
        res.status(500).json(erro);
    });
  };

  return controller;
}
