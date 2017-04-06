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
            console.log('this is $cookies', $cookies.getObject('user'));
        },
        templateUrl: 'tpl/main.html'
    }
}]);
