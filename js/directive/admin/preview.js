angular.module('app').directive('adminPreview', [()=>{
    return{
        restrict: 'AE',
        scope: {},
        controllerAs: 'preview',
        controller($cookies, $state, $stateParams, dbgetData){
            this.taskId = $stateParams.id;
            this.state = `admin.${$stateParams.preview}`;

          if(!$cookies.getObject('admin')){
                $state.go('login');
            }


            this.task = dbgetData.searchTaskById(this.taskId);

            console.log('this is task to lokkkk' ,this.task , $stateParams);
        },
        templateUrl: 'tpl/admin/main/myPreview.html'
    }
}]);
