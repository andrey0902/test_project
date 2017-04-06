app.directive('tabs',['$resource','$location','$http',function ($resource,$location,$http) {
    return{
        restrict: "A",
        replace: true,
        link: function(scope,element,attr){

        },
        templateUrl: './tpl/admin/adminMain.html'
    }
}]);