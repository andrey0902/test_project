app.directive('recovery', [() => {
    return {
        restrict: 'AE',
        scope: {},
        controllerAs: 'recovery',
        controller(){
            this.inquiry = (userData, valid) =>{

            }
        },
        templateUrl: 'tpl/recovery.html'
    }
}]);
