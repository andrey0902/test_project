 // new controler

 app.controller('previewCtrl',function ($scope,$http,$resource,$location,$rootScope) {
             $rootScope.url=null;

             const baseUrl='http://127.0.0.1:2403/error/';
             console.log( $rootScope.urlPage)
//prev block
         $scope.prev=function(){
             if($rootScope.urlPage=='inVorck.html'){
                 $rootScope.url='inVorck.html';
             }else{
                 $rootScope.url='tableAll.html';
             }

             console.log($rootScope.url)
         }
        $scope.main=function () {
            $location.path('/main')
            $rootScope.url='table.html'
            console.log($rootScope.url)
        }
//end prev block
                 $scope.data=$rootScope.previewItem;



$scope.addPost1=function (data,valid) {


    if(valid){

         if($('#save').prop('checked')==true){
             $scope.save1(data);
            // $location.url("http://localhost/#!/main");
         }else{
             $scope.pushe(data);
         }
    }else{


        $scope.showError=true;
        console.log('error')
    }
}





             console.log('previewCtrl')




            })