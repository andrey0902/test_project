angular.module('app').directive('statistics', [()=>{
    return{
        restrict: 'AE',
        scope: {},
        controllerAs: 'statistics',
        controller($cookies, $state, dbgetData){
            if(!$cookies.getObject('user')){
                $state.go('login');
            }
            this.user =$cookies.getObject('user');

            this.tasks = dbgetData.getTasks();
        },
        templateUrl: 'tpl/main/myStatistic.html'
    }
}]);
