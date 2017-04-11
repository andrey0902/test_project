angular.module('app').directive('sendToWork', [()=>{
    return{
        restrict: 'AE',
        scope: {},
        controllerAs: 'send',
        controller($cookies, $state, dbgetData){

             if(!$cookies.getObject('user')){
                $state.go('login');
            }

            this.task = dbgetData.getTasks();
        },
        templateUrl: '/tpl/main/sendToWork.html'
    }
}]);