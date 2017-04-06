app.directive('adminCreate', [()=>{
    return {
        restrict: 'AE',
        scope: {},
        controllerAs: 'create',
        controller($cookies, $state, dbAdmin){
             this.user = $cookies.getObject('admin');
            console.log('this is admin!!!!!111', this.user  );
            if(!this.user && this.user.position !== '1'){
                $state.go('login');
            }



            console.log( 'id user', this.user.id);

            this.addPost = (data, valid) =>{
                if(valid){
                    data.uid = this.user.id;
                    data.status = 2;
                    dbAdmin.createTask(data);
                    $state.go('admin.a-send-to-work');
                }
                console.log('this is edit', data, valid);
            };
            this.savePost = (data, valid) =>{
                if(valid){
                    data.uid = this.user.id;
                    data.status = 3;
                    dbAdmin.createTask(data);
                    $state.go('admin.a-send-to-work');
                }
                console.log('this is edit', data, valid);
            };
        },
        templateUrl: "/tpl/myCreate.html"
    }
}]);

