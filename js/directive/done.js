angular.module('app').directive('done', [()=>{
    return{
        restrict: 'AE',
        scope: {},
        controllerAs: 'done',
        controller($cookies, $state, dbgetData){
            if(!$cookies.getObject('user')){
                $state.go('login');
            }

            this.task = dbgetData.getTasks();
            console.log('send-to-wor');
        },
        templateUrl: 'tpl/main/MyFixed.html'
    }
}]);
