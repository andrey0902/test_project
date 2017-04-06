angular.module('app').directive('adminInWork', [()=>{
    return{
        restrict: 'AE',
        scope: {},
        controllerAs: 'work',
        controller($cookies, $state, dbAdmin){
            this.tasks = null;

            if(!$cookies.getObject('admin')){
                $state.go('login');
            }

            this.tasks = dbAdmin.getTasks();

            this.goToFixed = (id) => {
                dbAdmin.changeStatus({id,
                    status: 0})
            };
            console.log('this is admin in works-+');
        },
        templateUrl: 'tpl/admin/main/inWorks.html'
    }
}]);