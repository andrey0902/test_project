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
                console.log('header cookies',$cookies.getObject('user'));
            };

            $scope.$on('cookies', (event, arguments)=>{
                vm.user = arguments.message;
                console.log('this is message==__', arguments);
            });

            return vm;
        },
        templateUrl: 'tpl/header.html'
    }
}]);
