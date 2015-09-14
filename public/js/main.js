angular.module('stockviewer',['ngResource',"highcharts-ng"]).controller('ChartStock', function ($scope,$resource,$http) {

  $scope.highchartsNG = {
      options: {
          chart: {
              type: 'line'
          },
          xAxis: {
            categories: []
          }
      },
      series: [],
      title: {
          text: 'Stock Viewer'
      },
      loading: false
  }

  $http.get('https://www.quandl.com/api/v3/datasets/WIKI/GOOGL.json?order=asc&start_date=2015-01-01').success(function(stock){
    var serie = {
      name:'GOOGL',
      data: []
    }

    for(var stock of stock.dataset.data){
      $scope.highchartsNG.options.xAxis.categories.push(stock[0]);
      serie.data.push(stock[4]);

    }
    $scope.highchartsNG.series.push(serie);
  });

  $http.get('https://www.quandl.com/api/v3/datasets/WIKI/AAPL.json?order=asc&start_date=2015-01-01').success(function(stock){
    var serie = {
      name:'AAPl',
      data: []
    }

    for(var stock of stock.dataset.data){
      if (!(stock[0] in $scope.highchartsNG.options.xAxis.categories)){
        $scope.highchartsNG.options.xAxis.categories.push(stock[0]);
      }
      serie.data.push(stock[4]);
    }
    $scope.highchartsNG.series.push(serie);
  });
});
