 // new controler

         App.controller('previewCtrl',function ($scope,$http,$resource,$location,$rootScope) {

             const baseUrl='http://127.0.0.1:2403/error/';

//prev block
         $scope.prev=function(){
             $rootScope.url='tableAll.html';
             console.log($rootScope.url)
         }
        $scope.main=function () {
            $location.path('/main')
            $rootScope.url='table.html'
            console.log($rootScope.url)
        }
//end prev block
                 $scope.data=$rootScope.previewItem;


            $scope.dataResurs=$resource(baseUrl+':id',{id:"@id"})
             // создание нового элемента
            /* $scope.create = function (item) {
                 new $scope.itemsResource(item).$save().then(function (newItem) {
                     $scope.items.push(newItem);
                     $scope.currentView = "table";
                 });
             }*/

             $('#saveButton').click(function () {
                 console.log($('#save'))
                 $('input#save').prop('checked',true)

             })
            $scope.pushe=function(data){

                    console.log('push')

            }
            $scope.save1=function (data) {

                if(angular.isDefined(data)){
                   data.$save().then(function(newItem){
                     $location.url('/main/')
                    })
                }

                    console.log('save')

            }
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



             $scope.getError=function (error) {
                 if(angular.isDefined(error)){
                     if(error.required){
                         return 'Поле не должно быть пустым';
                     }if(error.minlength){
                         return 'Поле должно содержать не меньше 3 символов';
                     }if(error.maxlength){
                         return 'Поле должно содержать максимум 10 символов';
                     }if(error.passwor){
                         return 'Неправильно введее пароль'
                     }
                     if(error.email){
                         return 'Заполниет корректно поле'
                     }
                 }
             }

             console.log('EditCtrl')




            })