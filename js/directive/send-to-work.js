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
            console.log('send-to-wor');
        },
        templateUrl: 'tpl/main/MySendToWork.html'
    }
}]);