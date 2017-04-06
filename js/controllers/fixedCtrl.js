 // new controler

 app.controller('fixedCtrl',function ($scope,$http,$resource,$location,$rootScope) {
             $rootScope.url=null;
             $rootScope.urlPage=null;
             const baseUrl='http://127.0.0.1:2403/error/';
             $rootScope.urlPage='fixed.html';
             console.log( $rootScope.urlPage)
//prev block
         $scope.prev=function(){

              $rootScope.urlPage='fixed.html';
             // $scope.testUrl='inVorck';
              //console.log($rootScope.url)
              console.log('lox')
         }

//end prev block
                 $scope.data=$rootScope.previewItem;


            $scope.dataResurs=$resource(baseUrl+':id',{id:"@id"});
            $scope.refreshInVorck=function(){

                $scope.myTascks=$scope.dataResurs.query();

            }
             $scope.refreshInVorck();









             //console.log('inVorckCtrl')
             console.log('fixedCtrl')




            })