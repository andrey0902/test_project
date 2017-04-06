angular.module('app').directive('register', [() => {
    return {
        restrict: 'AE',
        scope: {},
        controllerAs: 'register',
        controller($state, $timeout, users){
            this.requiredValue = true;
            this.minValue = 3;
            this.maxValue = 25;
            this.pass = false;

            this.quireReg = (userData, valid) =>{
                if(this.pass && valid){
                    users.registration(userData).$promise.then((response)=>{

                        if(response.data === 'success'){
                            $state.go('login');
                        }
                        this.responseError = true;
                        $timeout(()=>{
                            this.responseError = false;
                        }, 3000);

                    });
                }
            };

            this.mismatch = (firest, second ) => {
                if( firest === second) {
                    this.error = false;
                    return this.pass = true
                }
                this.error = true;
                this.confirmPassword = 'Пароли не совпадают!';

               $timeout(()=>{
                    this.error = false;
                }, 3000);
            };

        },
        templateUrl: 'tpl/register.html'
    }
}]);
