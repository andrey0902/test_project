app.directive('tasks', [()=>{
    return{
        restrict: 'AE',
        scope: {},
        controllerAs: 'tasks',
        controller($cookies, $state, dbgetData){

            if(!$cookies.getObject('user')){
                $state.go('login');
            }

            this.modules = dbgetData.getModules();

        },
        templateUrl: 'tpl/main.html'
    }
}]);
