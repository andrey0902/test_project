(()=>{
    angular.module('app').directive('editUser', editUser);

    function editUser() {
        return {
            restrict: 'EA',
            scope: {},
            controllerAs: 'editUser',
            controller($cookies, $state, $stateParams, users){
                this.user = null;
                this.id = $stateParams.id;

                if(!$cookies.getObject('admin')){
                    $state.go('adminLogin');
                }

                this.user = users.getUserById(this.id);

                this.queryUpdate = (userData, valid) =>{
                    if(valid){
                        users.update(userData , this.id);
                        $state.go('admin.users');
                    }

                }

            },
            templateUrl: 'tpl/admin/main/edit.html'
        }
    }
})();

