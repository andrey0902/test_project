(()=>{
    angular.module('app').directive('error', [tasks]);

    function tasks(){
        return{
            restrict: 'EA',
            scope: {},
            controllerAs: 'error',
            controller($cookies, $state, dbgetData){

                if(!$cookies.getObject('user')){
                    $state.go('login');
                }
                this.user = $cookies.getObject('user');
                this.tasks = dbgetData.getTasks();

                this.del = (task) =>{
                    dbgetData.deleteById(task);
                    console.log('delete id', task.id);
                }
            },
            templateUrl: 'tpl/main/mytable.html'
        }
    }
})();

