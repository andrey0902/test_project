 // new controler

         App.controller('EditCtrl',function ($scope,$http,$resource,$location,$rootScope) {

             const baseUrl='http://127.0.0.1:2403/error/';

//test block
            // $scope.testis=document.cookie;

           //  var result=$scope.testis.match(/edit1=({.*})/i)
          //  $scope.data=JSON.parse(result[1])
            // console.log(result)
           //  console.log($scope.data)
             //document.cookie = "edit=; path=/; expires=0";
//end test block
                 $scope.data=$rootScope.tempItem;


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
                data.status=2;
                data.date= new Date().getHours()+':'+ new Date().getMinutes() +' - '+ new Date().getDate()+ '.'+(new Date().getMonth()+1)+'.'+new Date().getFullYear();
                 if(angular.isDefined(data)){
                    data.$save().then(function(newItem){
                        $location.url('/main/')
                    })
                }
                    console.log('push')

            }
            $scope.save1=function (data) {
                data.date= new Date().getHours()+':'+ new Date().getMinutes() +' - '+ new Date().getDate()+ '.'+(new Date().getMonth()+1)+'.'+new Date().getFullYear();
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