 // new controler

         App.controller('AppCtrl',function ($scope,$http,$resource,$rootScope,$location) {
            $scope.showFormAuthor=true;
            $scope.requiredValue=true;
            $scope.minValue=3;
            $scope.maxValue=10;
            const baseUrLUser='http://127.0.0.1:2403/user/';
             $scope.usreCreate=$resource(baseUrLUser + ':id',{id :'@id'});



             $scope.show= function (isShow) {
                 if(isShow=='recovery'){
                     $scope.showFormAuthor= false;
                     $scope.showRegisterForm=false;
                     $scope.showRecoverForm=true;
                     $scope.showError=false;
                 } else if( isShow=='registration'){
                     $scope.showFormAuthor= false;
                     $scope.showRecoverForm=false;
                     $scope.showRegisterForm=true;
                     $scope.showError=false;
                 }if(isShow=='auto'){
                     $scope.showRecoverForm=false;
                     $scope.showFormAuthor= true;
                     $scope.showRegisterForm=false;
                     $scope.showError=false;
                 }
             };



            $scope.mismatch=function(password,confirmPassword){

              
                if(password!==confirmPassword&&$scope.showRegisterForm==true){
                    $scope.showErrorPassword=true;
                }else{
                    $scope.showErrorPassword=false;
                }




            };
            $scope.inquiry=function(userParam,isValid){

                if(isValid){
                    console.log(userParam)
                    // �������� � ���������� ������ �� ������)))
                 console.log('very good1');
                  return;
                }else{
                    $scope.showError=true;
                }

            };
             // создание нового элемента
             /* $scope.create = function (item) {
              new $scope.itemsResource(item).$save().then(function (newItem) {
              $scope.items.push(newItem);
              $scope.currentView = "table";
              });
              }*/
            $scope.quireReg=function (userParam,isValid) {
                if(isValid){
                    var newUser={
                        login:userParam.login,
                        password: userParam.password,
                        hash: 555,
                        attribute:3,
                        keyWord:userParam.keyWord,
                        email:userParam.email,
                        group:userParam.group
                    };
                    new $scope.usreCreate(newUser).$save().then(function (newUser) {
                        $rootScope.newUser=newUser;
                        $location.url("/main");
                    });
                    console.log(newUser)
                }else{
                    $scope.showError=true;
                }
            }


             $scope.getError=function(error){
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
            })