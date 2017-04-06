angular.module('app').directive('adminStatistics', [()=>{
    return{
        restrict: 'AE',
        scope: {},
        controllerAs: 'stat',
        controller($cookies, $state, dbAdmin){
            this.tasks = null;

            if(!$cookies.getObject('admin')){
                $state.go('login');
            }

            this.tasks = dbAdmin.getTasks();


        },
        templateUrl: 'tpl/admin/main/statistic.html'
    }
}]);
