angular.module('app').directive('adminDone', [()=>{
    return{
        restrict: 'AE',
        scope: {},
        controllerAs: 'done',
        controller($cookies, $state, dbAdmin){
            this.tasks = null;

            if(!$cookies.getObject('admin')){
                $state.go('login');
            }

            this.tasks = dbAdmin.getTasks();

            this.openAgain = (id) => {
                dbAdmin.changeStatus({id,
                    status: 2})
            };
            console.log('this is admin in works-+');
        },
        templateUrl: 'tpl/admin/main/fixed.html'
    }
}]);
