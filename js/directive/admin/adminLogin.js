angular.module('app').directive('adminLogin',()=>{
    return  {
           restrict: 'AE',
            scope: {},
            controller($cookies, $state, $rootScope, users){
                this.requiredValue = true;
                this.minValue = 3;
                this.maxValue = 15;

                console.log('admin-login');
                this.inquiry = (userData, valid) =>{
                    if(valid){
                        users.inLogin(userData).then((response)=>{

                            if(response.position === '1'){

                                $rootScope.$broadcast('cookies', {
                                    message: response
                                });
                                $cookies.putObject('admin', response);
                                $state.go('admin.users');
                                console.log('response admin data', response);
                            }

                        })
                    }
                    console.log('admin-login userData, valid', userData, valid);
                };

            },
            controllerAs: 'ALogin',
            templateUrl: 'tpl/admin/myLoginAdmin.html'

    }


} );