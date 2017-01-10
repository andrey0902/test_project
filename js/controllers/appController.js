 // new controler

         App.controller('AppCtrl',function ($scope,$http,$resource,$rootScope,$location,$cookies) {
            $rootScope.urlPath=null;
             $scope.newUser=null;
            $scope.showFormAuthor=true;
            $scope.requiredValue=true;
            $scope.minValue=3;
            $scope.maxValue=10;
            const baseUrLUser='http://127.0.0.1:2403/user/';
             $scope.usreCreate=$resource(baseUrLUser + ':name',{id :'@name'});



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
// authorization
            $scope.inquiry=function(userParam,isValid){

                if(isValid){
                    console.log(userParam)

                   var test =$http.post(baseUrLUser+"login",{username:userParam.login,password:md5(userParam.password)})
                 test.then(fulfild,reject)
                    function fulfild(a) {
                     var argument={
                         name: userParam.login,
                         id: a.data.id,
                         uid: a.data.uid
                     };
                     $rootScope.userData=argument;
                     $cookies.putObject('test',argument);  //cookies
                        $rootScope.newUser=a.data;
                        console.log(a);
                        $location.url("/main");
                    }
                    function reject(a) {
                        console.log(a);
                        $scope.showErrorPassword=true;
                    };

                }else{
                    $scope.showError=true;
                }

            };
             console.log($rootScope.userData)
            $scope.quireReg=function (userParam,isValid) {
                if(isValid){
                    var newUser={
                        username:userParam.login,
                        password:md5(userParam.password) ,
                        hash: md5(Math.floor(Math.random()*(100))),
                        attribute:3,
                        keyWord:userParam.keyWord,
                        email:userParam.email,
                        group:userParam.group
                    };
                    var test =$http.post(baseUrLUser,newUser)
                    test.then(fulfild,reject);
                    function fulfild(a) {
                        console.log(a);
                    };

                    $location.url("/main");


                }else{
                    $scope.showError=true;
                }
            };
             function reject(a) {
                 console.log(a);
             };

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