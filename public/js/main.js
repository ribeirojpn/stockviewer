angular.module('stockviewer',['ngResource',"highcharts-ng"]).controller('ChartStock', function ($scope,$resource,$http) {

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

  $scope.stock = '';

  $scope.add = function() {
    $http.get("https://www.quandl.com/api/v3/datasets/WIKI/" + $scope.stock + ".json?order=asc&start_date=2015-01-01").success(function(stock){
      var serie = {
        name:$scope.stock,
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
});
