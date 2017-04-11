app.directive('create', [()=>{
    return {
        restrict: 'AE',
        scope: {},
        controllerAs: 'create',
        controller($cookies, $state, dbgetData){

            if(!$cookies.getObject('user')){
                $state.go('login');
                exit()
            }
            this.user = $cookies.getObject('user');



            this.addPost = (data, valid) =>{
                if(valid){
                    data.uid = this.user.id;
                    data.status = 2;
                    dbgetData.createTask(data);
                    $state.go('tasks.error');
                }

            };
            this.savePost = (data, valid) =>{
                if(valid){
                    data.uid = this.user.id;
                    data.status = 3;
                    dbgetData.createTask(data);
                    $state.go('tasks.error');
                }

            };
        },
        templateUrl: "/tpl/myCreate.html"
    }
}]);
