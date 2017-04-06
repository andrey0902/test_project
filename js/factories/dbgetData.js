angular.module('app').factory('dbgetData', ['$resource', '$state', ($resource, $state) =>{
    class dbgetData {
        constructor(){
            this.tasks = null;
            this.tasks1 =null;

            this.conect = $resource('',{},{
                get:{
                    method: 'GET',
                    params: {
                       get: 'modules'
                    },
                       url: 'DB.php',
                   isArray: true
                },
                getAllTasks:{
                    method: 'GET',
                    params: {
                       get: 'tasks'
                    },
                       url: 'DB.php',
                    isArray: true
                },
                update: {
                    method: 'PUT',
                    params: {
                        put: 'update',
                        data: '@data'
                    },
                    url: 'DB.php'
                },
                del: {
                    method: 'DELETE',
                    params: {
                        delete: 'del',
                        id: '@id'
                    },
                    url: 'DB.php'
                },
                create: {
                    method: 'POST',
                    params: {
                        post: 'post',
                        data: '@data'
                    },
                    url: 'DB.php'
                }
            });
            this.getTasks();

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
            if(this.tasks.length === 0) $state.go('tasks.error');
           for( let i = 0; i < this.tasks.length; i++){
                if(this.tasks[i].id === id){
                    result = angular.copy(this.tasks[i]);
                    break;
                }
            }
            console.log('result this.task11111',result, this.tasks);
            return result;
        }

        deleteById(task){
            console.log('task is delete', task.id);
            this.tasks.splice(this.tasks.indexOf(task), 1);
            this.conect.del({id: task.id});
        }

        updateTasks(data){

            this.conect.update({data:data});

            for(let i = 0; i<= this.tasks.length; i++){
                if(this.tasks[i].id === data.id){
                    this.tasks[i] = data;
                    break;
                }
            }
        }
    }


    return new dbgetData();
}]);
