angular.module('app').directive('edit', [()=>{
    return{
        restrict: 'AE',
        scope: {},
        controllerAs: 'edit',
        controller($cookies, $stateParams, $state, dbgetData){
            this.task = null;

            if(!$cookies.getObject('user')){
                $state.go('login');
            }

            this.task = dbgetData.searchTaskById($stateParams.id);

            this.addPost = (data, valid) =>{
                if(valid){
                    data.status = 2;
                    dbgetData.updateTasks(data);
                    $state.go('tasks.error');
                }
            };

            this.savePost = (data, valid) =>{
                if(valid){
                    dbgetData.updateTasks(data);
                    $state.go('tasks.error');
                }
            };
        },
        templateUrl: 'tpl/myEdit.html'
    }
}]);
