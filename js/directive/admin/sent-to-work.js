angular.module('app').directive('aSendToWork', [()=>{
    return{
        restrict: 'AE',
        scope: {},
        controllerAs: 'send',
        controller($cookies, $state, dbAdmin){
            this.task = null;

            if(!$cookies.getObject('admin')){
                $state.go('login');
            }

            this.task = dbAdmin.getTasks();


            this.goToFixed = (id) => {
                dbAdmin.changeStatus({
                    id,
                    status: 1})
            };

        },
        templateUrl: 'tpl/admin/main/tasks.html'
    }
}]);