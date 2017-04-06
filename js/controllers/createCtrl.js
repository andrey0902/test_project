 // new controler

 app.controller('CreateCtrl',function ($scope,$http,$resource,$location,$cookies) {
             const baseUrl='http://127.0.0.1:2403/error/';
             $scope.dataTabsNew=[];
            $scope.dataResurs=$resource(baseUrl+':id',{id:"@id"})
             console.log($cookies.getObject('test'))

             $scope.uid=$cookies.getObject('test').uid;
             console.log($scope.uid)
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
                if(angular.isDefined(data)){
                    // data
                    data.uid= $scope.uid;
                    data.status=2;
                    data.date= new Date().getHours()+':'+ new Date().getMinutes() +' - '+ new Date().getDate()+ '.'+(new Date().getMonth()+1)+'.'+new Date().getFullYear();
                    new $scope.dataResurs(data).$save().then(function(newItem){
                        $scope.dataTabsNew.push(newItem)
                        $location.url('/main/')
                    })
                }
                    console.log('push')

            }
            $scope.save=function (data) {
                if(angular.isDefined(data)){
                    // data
                    data.uid= $scope.uid;
                    data.status=3;
                    data.date= new Date().getHours()+':'+ new Date().getMinutes() +' - '+ new Date().getDate()+ '.'+(new Date().getMonth()+1)+'.'+new Date().getFullYear();
                    console.log(data)
                    new $scope.dataResurs(data).$save().then(function(newItem){
                        $scope.dataTabsNew.push(newItem)
                        $location.url('/main/')
                    })
                }

                    console.log('save')

            }
$scope.addPost1=function (data,valid) {


    if(valid){

         if($('#save').prop('checked')==true){
             $scope.save(data);
             $location.url("/main");
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

             console.log('CreateCtrl')




            })