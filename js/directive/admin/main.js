angular.module('app').directive('adminMain', ()=>{
    return {
        restrict: 'AE',
        scope: {},
        controllerAs: 'main',
        controller($cookies, $state, dbAdmin){
            if(!$cookies.getObject('admin')){
                $state.go('adminLogin');
            }

            this.modules = dbAdmin.getModules();
            console.log('admin main------');
        },
        templateUrl: 'tpl/admin/myAdminMain.html'
    }
    });
