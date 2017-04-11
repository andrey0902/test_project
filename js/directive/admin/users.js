angular.module('app').directive('users', ()=>{
    return {
        restrict: 'AE',
        scope: {},
        controllerAs: 'users',
        controller($cookies, $state, users){
            if(!$cookies.getObject('admin')){
                $state.go('adminLogin');
            }
             users.getAllUsers().then((response)=>{
                 this.users = response;
            });
/*paginator*/
            this.pages = users.getPaginationList();

            users.getAllUsersPage().then((response)=> {
                 this.usersInPage = response;

             });

             this.showPages = (page)=>{
                if (page ===  'prev'){
                    users.getPrevPageProducts().then((response)=> {
                        this.usersInPage = response;
                    });
                } else if( page === 'next'){
                    users.getNextPageProducts().then((response)=> {
                        this.usersInPage = response;

                    });
                }else{
                    users.getAllUsersPage(page).then((response)=> {
                        this.usersInPage = response;
                    });
                }
            };

/*End paginator*/

            this.del = (id) =>{
                users.delUser(id);
            };

        },
        templateUrl: 'tpl/admin/main/user.html'
    }
});
