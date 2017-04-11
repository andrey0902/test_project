angular.module('app').directive('inWork', [()=>{
    return{
        restrict: 'AE',
        scope: {},
        controllerAs: 'inWork',
        controller($cookies, $state, dbgetData){
            if(!$cookies.getObject('user')){
                $state.go('login');
            }

            this.task = dbgetData.getTasks();

        },
        templateUrl: 'tpl/main/MyInWork.html'
    }
}]);