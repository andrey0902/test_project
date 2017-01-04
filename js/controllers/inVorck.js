 // new controler

         App.controller('inVorckCtrl',function ($scope,$http,$resource,$location,$rootScope) {

             const baseUrl='http://127.0.0.1:2403/error/';

//prev block
         $scope.prev=function(){
             $rootScope.url='inVorck.html';
             console.log($rootScope.url)
         }

//end prev block
                 $scope.data=$rootScope.previewItem;


            $scope.dataResurs=$resource(baseUrl+':id',{id:"@id"});
            $scope.refreshInVorck=function(){
                $scope.myTascks=$scope.dataResurs.query();
            }
             $scope.refreshInVorck();









             console.log('inVorckCtrl')




            })