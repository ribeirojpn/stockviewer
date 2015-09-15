module.exports = function (app) {
  var controller = app.controllers.stock;

  app.route('/stock')
      .get(controller.getStocks)
      .post(controller.saveStock);
      // .delete(controller.removeStock);

  app.route('/stock/:name')
    // .get(controller.getStocks)
    .get(controller.getStock)
    .delete(controller.removeStock);

}
