App.controller('statisticCtrl',function ($scope,$http,$resource,$location,$rootScope,$cookies) {
    const baseUrl='http://127.0.0.1:2403/error/';
    $scope.dataResurs=$resource(baseUrl+':id',{id: '@id'});
   $scope.data=$scope.dataResurs.query();
    $scope.userInfo=  $cookies.getObject('test'); //cooki
    console.log('statisticCtrl')
});