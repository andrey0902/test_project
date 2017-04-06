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
                 console.log('this.usersInPage', this.usersInPage);
             });

             this.showPages = (page)=>{
                if (page ===  'prev'){
                    users.getPrevPageProducts().then((response)=> {
                        this.usersInPage = response;
                        console.log('this.usersInPage', this.usersInPage);
                    });
                } else if( page === 'next'){
                    users.getNextPageProducts().then((response)=> {
                        this.usersInPage = response;
                        console.log('this.usersInPage', this.usersInPage);
                    });
                }else{
                    users.getAllUsersPage(page).then((response)=> {
                        this.usersInPage = response;
                        console.log('this.usersInPage', this.usersInPage);
                    });
                }

                 console.log('this is page', page);
            };
            console.log('this is pages array',this.pages);
/*End paginator*/

            this.del = (id) =>{
                users.delUser(id);
                console.log('id the users delet',id)
            };


                console.log('users admin', this.users);
        },
        templateUrl: 'tpl/admin/main/user.html'
    }
});
