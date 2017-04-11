angular.module('app').directive('preview', [()=>{
    return{
        restrict: 'AE',
        scope: {},
        controllerAs: 'preview',
        controller($cookies, $state, $stateParams, dbgetData){
            this.taskId = $stateParams.id;
            this.state = `tasks.${$stateParams.preview}`;

            if(!$cookies.getObject('user')){
                $state.go('login');
            }

            this.task = dbgetData.searchTaskById(this.taskId);
        },
        templateUrl: 'tpl/myPreview.html'
    }
}]);
