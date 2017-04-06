angular.module('app').factory('users', ['$resource', '$state', '$sce', '$sceDelegate',($resource, $state, $sce, $sceDelegate)=>{
    class Users{
        constructor(){
            this.currenPage = 0;
            this.itemsInPage = 8;
            this.users1 = [];
            this.users = [];

            this.connect = $resource('',{},{
                autho: {
                    method: 'POST',
                    params: {
                        autho: 'autho',
                        data: '@data'
                    },
                    url: 'DBUsers.php'
                },
                registration: {
                    method: 'POST',
                    params: {
                        registr: 'reg',
                        data: '@data'
                    },
                    url: 'DBUsers.php'
                },
                getAllUsers: {
                    method: 'GET',
                    params: {
                        get: 'allUsers'
                    },
                    url: 'DBUsers.php',
                },
                delUser: {
                    method: 'DELETE',
                    params: {
                        del: 'user',
                        id: '@id'
                    },
                    url: 'DBUsers.php'
                },
                update: {
                    method: 'PUT',
                    params: {
                        put: 'update',
                        data: '@data'
                    },
                    url: 'DBUsers.php'
                }
            });

            this.getAllUsers();
        }

        getUserById(id){
            let user = {};
            if(this.users.length === 0) $state.go('admin.users');
            for(let i = 0; i < this.users.length; i++){
                if(this.users[i].id === id ){
                    console.log('edit user id---', this.users[i]);
                    user = angular.copy(this.users[i]);
                    break;
                }
            }
            return user;
        }
/*start paginator*/
        getAllUsersPage(num = 0){
            let first = this.itemsInPage * num;
            let last = first + this.itemsInPage;
            this.currenPage = num;
            return this.connect.getAllUsers().$promise.then((response)=>{
                last = (response.data.length > last )? last : response.data.length;
                return this.users1 = response.data.splice(first, last);
            })
        }

        getNextPageProducts(){
            let nextPageNum = this.currenPage + 1;
            let pageNum = this.getTotalPageNum();
            if(nextPageNum >= pageNum) nextPageNum = pageNum - 1;
            return this.getAllUsersPage(nextPageNum);
        }/* END of getPrevPageProducts */

        getPrevPageProducts(){
            let prevPageNum =  this.currenPage - 1;
            if(prevPageNum < 0 ) prevPageNum = 0;
            return this.getAllUsersPage(prevPageNum);
        }/* END of getNextPageProducts */


        getTotalPageNum(){
            return Math.ceil(this.users.length / this.itemsInPage);
        }

        getPaginationList(){
            let pagesNum = this.getTotalPageNum();
            let arrPagesLists = [];

            arrPagesLists.push({
                name:  $sce.trustAsHtml('&laquo;'),
                link: 'prev'
            });

            for( let i = 0; i < pagesNum; i++){
                let name = i + 1;
                arrPagesLists.push({
                    name: $sce.trustAsHtml(String(name)),
                    link: i
                });
            }
            arrPagesLists.push({
                name: $sce.trustAsHtml('&raquo;'),
                link: 'next'
            });
            if(pagesNum > 1){
                return arrPagesLists;
            }
            return false;
        }
/*end paginator*/
        update(data, id){
           /* for(let i = 0; i < this.users.length; i++){
                if(this.users[i].id === id ){
                    this.users[i] = data;
                    console.log('edit user id---', this.users[i]);
                    break;
                }
            }*/
            this.connect.update({data});
            console.log('edit user+++', data, id);
        }

        inLogin(data){
            return  this.connect.autho({data}).$promise.then((response)=>{
               console.log('this is response is login',response.data);
                return response.data;
            });
        }

        registration(data){
            return this.connect.registration({data});
        }

        getAllUsers(){
            return this.connect.getAllUsers().$promise.then((response)=>{
                console.log('users', response);
               return this.users = response.data;
            })
        }

        delUser(id){
            for(let i = 0; i < this.users.length; i++){
                if(this.users[i].id ===id){
                    this.users.splice(this.users.indexOf(this.users[i]), 1);
                    console.log('users', this.users[i]);
                    break;
                }
                this.connect.delUser({id})
            }
        }

    }

    return new Users();
}]);
