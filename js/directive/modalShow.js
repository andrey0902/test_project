app.directive('modal',function () {
    return{
        restrict: "A",
        replace: true,
        scope:true,
        link: function(scope,element,attr){
            scope.goToFixed=function (item) {
                scope.$emit('goToFixed',{
                    message:item
                });
            };
            scope.Fixed=function (item) {
                scope.$emit('Fixed',{
                    message:item
                });
            };
            scope.$on('prevModal',function (event,args) {
                scope.prevData=args.prevData;

            });
            scope.$on('changeUrl',function (event,args) {
                scope.url=args.message;
                scope.setVariebel(scope.url)

            });
            scope.setVariebel= function (url) {
                if(url=='./tpl/admin/main/tasks.html'){
                    scope.event='Отправить в обработку';
                    scope.default=true;
                }else if(url=='./tpl/admin/main/inWorks.html'){
                    scope.default=false;
                    scope.event='Исправлен'
                }else if(url=='./tpl/admin/main/fixed.html'){
                    scope.default=undefined;
                    scope.event='Исправлен'
                }else if(url=='./tpl/admin/main/create.html'){
                    scope.event='Закрыть'
                }
            }

        },
        templateUrl:'./tpl/admin/main/modal.html'
    }
});