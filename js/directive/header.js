app.directive('header', [()=>{
    return {
        restrict: 'EA',
        scope: {},
        controllerAs:'head',
        controller($cookies, $state, $scope){
            let vm = this;
            if($cookies.getObject('user')){
                vm.user = $cookies.getObject('user');
            }else if ($cookies.getObject('admin')){
                vm.user = $cookies.getObject('admin');
            }


            vm.logOut = ()=>{
                vm.user = null;
                $cookies.remove('user');
                $state.go('login');

            };

            $scope.$on('cookies', (event, arguments)=>{
                vm.user = arguments.message;

            });

            return vm;
        },
        templateUrl: 'tpl/header.html'
    }
}]);
