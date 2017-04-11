angular.module('app').factory('users', ['$resource', ($resource)=>{
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
                    user = angular.copy(this.users[i]);
                    break;
                }
            }
            return user;
        }

        update(data){
            this.connect.update({data});
        }

        inLogin(data){
            return  this.connect.autho({data}).$promise.then((response)=>{

                return response.data;
            });
        }

        registration(data){
            return this.connect.registration({data});
        }

        getAllUsers(){
            return this.connect.getAllUsers().$promise.then((response)=>{

               return this.users = response.data;
            })
        }

        delUser(id){
            for(let i = 0; i < this.users.length; i++){
                if(this.users[i].id === id){
                    this.users.splice(this.users.indexOf(this.users[i]), 1);

                    break;
                }
                this.connect.delUser({id})
            }
        }

    }

    return new Users();
}]);
