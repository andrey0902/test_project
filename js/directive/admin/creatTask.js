app.directive('adminCreate', [()=>{
    return {
        restrict: 'AE',
        scope: {},
        controllerAs: 'create',
        controller($cookies, $state, dbAdmin){
             this.user = $cookies.getObject('admin');

            if(!this.user && this.user.position !== '1'){
                $state.go('login');
            }





            this.addPost = (data, valid) =>{
                if(valid){
                    data.uid = this.user.id;
                    data.status = 2;
                    dbAdmin.createTask(data);
                    $state.go('admin.a-send-to-work');
                }

            };
            this.savePost = (data, valid) =>{
                if(valid){
                    data.uid = this.user.id;
                    data.status = 3;
                    dbAdmin.createTask(data);
                    $state.go('admin.a-send-to-work');
                }

            };
        },
        templateUrl: "/tpl/myCreate.html"
    }
}]);

