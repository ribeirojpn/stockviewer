angular.module('stockviewer',['ngResource',"highcharts-ng"]).controller('ChartStock', function ($scope,$resource,$http) {
  var Stock = $resource('/stock/:name');
  $scope.stock = new Stock();
  $scope.highchartsNG = {
      options: {
          chart: {
              type: 'line'
          },
          xAxis: {
            type: 'datetime'
          }
      },
      series: [],
      title: {
          text: 'Stock Viewer'
      },
      loading: false
  }

  function getFromDB(){
    $scope.highchartsNG.series = [];
    Stock.query(function(stocks) {
      for (var stc of stocks) {
        console.log(stc.name);
        $http.get("https://www.quandl.com/api/v3/datasets/WIKI/" + stc.name + ".json?api_key=6YRfiHc8417Zk4DzyD3s&order=asc&start_date=2015-01-01").success(function(stock){
          var serie = {
            name: stock.dataset.dataset_code,
            data: [],
          }

          for(var stock of stock.dataset.data){
            var date = new Date(stock[0]);
            var mili = date.getTime();

            var dataStock =  [mili,stock[4]]

            serie.data.push(dataStock);
          }

          $scope.highchartsNG.series.push(serie);
        }).error(function(erro) {
          console.error(erro);
        });
      }
    })
  };
  getFromDB();

  $scope.add = function() {
    $http.get("https://www.quandl.com/api/v3/datasets/WIKI/" + $scope.stock.name + ".json?order=asc&start_date=2015-01-01").success(function(stock){
      var serie = {
        name:$scope.stock.name,
        data: [],
      }

      for(var stock of stock.dataset.data){
        var date = new Date(stock[0]);
        var mili = date.getTime();

        var dataStock =  [mili,stock[4]]

        serie.data.push(dataStock);
      }

      $scope.highchartsNG.series.push(serie);

      $scope.stock.$save().then(
        function() {
        $scope.stock = new Stock();
      }).catch(function(erro) {
        console.log('Não foi possivel salvar o stock');
        console.log(erro);
      });
    }).error(function(erro) {
      console.error(erro);
    });
  };

  $scope.remove = function(stock) {
    console.log(stock);
    Stock.delete({name: stock.name},getFromDB,function (erro) {
      console.log(erro);
    });
  }
});
