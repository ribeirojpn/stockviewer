module.exports = function (app) {
  var controller = app.controllers.stock;
  
  app.route('/stock')
    .get(controller.getStocks)
    .post(controller.saveStock)
    .remove(controller.removeStock);

}
