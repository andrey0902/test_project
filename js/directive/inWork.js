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
            console.log('inWork');
        },
        templateUrl: 'tpl/main/MyInWork.html'
    }
}]);