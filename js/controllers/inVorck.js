 // new controler

 app.controller('inVorckCtrl',function ($scope,$http,$resource,$location,$rootScope) {
             $rootScope.url=null;
             $rootScope.urlPage=null;
             const baseUrl='http://127.0.0.1:2403/error/';
             $rootScope.urlPage='inVorck.html';
             console.log( $rootScope.urlPage)
//prev block
         $scope.prev=function(){

              $rootScope.urlPage='inVorck.html';
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









             console.log('inVorckCtrl')




            })