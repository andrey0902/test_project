angular.module('app').factory('dbAdmin', ['$resource', ($resource) =>{
    class dbgetData {
        constructor(){
            this.tasks = null;

            this.conect = $resource('',{},{
                get:{
                    method: 'GET',
                    params: {
                       get: 'modulesAdmin'
                    },
                       url: 'DBAdmin.php',
                   isArray: true
                },
                getAdminModules:{
                    method: 'GET',
                    params: {
                        get: 'modules'
                    },
                    url: 'DBAdmin.php',
                    isArray: true
                },
                getAllTasks:{
                    method: 'GET',
                    params: {
                       get: 'tasks'
                    },
                       url: 'DBAdmin.php',
                    isArray: true
                },
                update: {
                    method: 'PUT',
                    params: {
                        put: 'update',
                        data: '@data'
                    },
                    url: 'DBAdmin.php'
                },
                changeStatus: {
                    method: 'PUT',
                    params: {
                        status: 'change',
                        data: '@data'
                    },
                    url: 'DBAdmin.php'
                },
                del: {
                    method: 'DELETE',
                    params: {
                        delete: 'del',
                        id: '@id'
                    },
                    url: 'DBAdmin.php'
                },
                create: {
                    method: 'POST',
                    params: {
                        post: 'post',
                        data: '@data'
                    },
                    url: 'DBAdmin.php'
                }
            });
            this.getTasks();

        }

        getTasks1(){
            return  this.conect.getAllTasks().$promise.then((response)=>{

                return this.tasks1 = response;
            })

        }

        createTask(task){
            this.tasks.push(task);
            this.conect.create({data: task});
        }

        getModules() {
            return this.conect.get();
        }

        getTasks(){
            return this.tasks = this.conect.getAllTasks();

        }

        searchTaskById(id){
            let result = {};

            for( let i = 0; i < this.tasks.length; i++){
                if(this.tasks[i].id === id){
                    result = angular.copy(this.tasks[i]);
                    break;
                }
            }
            return result;
        }

        deleteById(task){

            this.tasks.splice(this.tasks.indexOf(task), 1);
            this.conect.del({id: task.id});
        }

        updateTasks(data){

            this.conect.create({data});

            for(let i = 0; i<= this.tasks.length; i++){
                if(this.tasks[i].id === data.id){
                    this.tasks[i] = data;
                    break;
                }
            }
        }

        changeStatus(data){
           this.conect.changeStatus({data});

           for(let i = 0; i<= this.tasks.length; i++){
                if(this.tasks[i].id === data.id){
                    this.tasks[i].status = data.status;
                    break;
                }
            }
        }
    }


    return new dbgetData();
}]);
