 // new controler

         App.controller('AppCtrl',function ($scope) {
            $scope.showFormAuthor=true;
            $scope.requiredValue=true;
            $scope.minValue=3;
            $scope.maxValue=10;




            $scope.show= function (isShow) {
                if(isShow=='recovery'){
                    $scope.showFormAuthor= false;
                    $scope.showRegisterForm=false;
                    $scope.showRecoverForm=true;

                } else if( isShow=='registration'){
                    $scope.showFormAuthor= false;
                    $scope.showRecoverForm=false;
                    $scope.showRegisterForm=true;
                }if(isShow=='auto'){
                    $scope.showRecoverForm=false;
                    $scope.showFormAuthor= true;
                    $scope.showRegisterForm=false;

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
                    // �������� � ���������� ������ �� ������)))
                 console.log('very good');
                  return;
                }else{
                    $scope.showError=true;
                }

            };
         

            $scope.getError=function(error){
                if(angular.isDefined(error)){
                    if(error.required){
                        return '���� �� ������ ���� ������';
                    }if(error.minlength){
                        return '���� ������ ��������� �� ������ 3 ��������';
                    }if(error.maxlength){
                        return '���� ������ ��������� �������� 10 ��������';
                    }if(error.passwor){
                        return '����������� ������ ������'
                    }
                    if(error.email){
                        return '��������� ��������� ����'
                    }
                }
            }
            })