angular.module('app').directive('usersCreate', [()=>{
    return{
        restrict: 'AE',
        scope: {},
        controllerAs: 'tasks',
        controller($cookies, $state, dbAdmin){
            this.tasks = null;

            if(!$cookies.getObject('admin')){
                $state.go('login');
            }

            this.tasks = dbAdmin.getTasks();
        },
        templateUrl: 'tpl/admin/main/create.html'
    }
}]);

