angular.module('app').directive('login', [function(){
    return{
        restrict: 'EA',
        scope: {},
        controller($rootScope, $cookies, $state, $timeout, users){
            this.required = true;
            this.minValue = 3;
            this.maxValue = 10;
            this.error = null;

            this.inquiry = (userData, valid) =>{
                if(valid){
                    users.inLogin(userData).then((response)=>{

                        if(response !== 'error'){
                            $rootScope.$broadcast('cookies', {
                                message: response
                            });
                            $cookies.putObject('user', response);
                            $state.go('tasks.error');
                        }
                        this.error = true;

                        $timeout(()=>{
                            this.error = null;
                            }, 3000);
                    });

                }

            }
        },
        controllerAs: 'login',
        link(){

        },
        templateUrl: 'tpl/login.html'
    }
}]);
