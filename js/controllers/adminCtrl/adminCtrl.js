'defer';
 // new controler

         App.controller('adminCtrl',function ($resource,$location, $http,$interval,$rootScope,$cookies) {
        this.data=null;
        this.requiredValue = true;
        this.minValue = 3;
        this.maxValue = 10;

        this.islogin='Вход!)';
             this.dbUrl='http://127.0.0.1:2403/user/login';

             this.inquiry=function (data,valid) {
                if(valid){
                    if(angular.isDefined(data)){
                        console.log(data)
                   var promis= $http.post(this.dbUrl,{"username":data.username,"password":md5(data.password)});
                       promis.then(success,reject);
                        function reject(e) {
                            console.log(e)
                        }
                        function success(d) {
                            $cookies.putObject('user',d.data);  //cookies
                          $location.url('/admin/main/');
                        }
                        // return;
                    }
                }
                    this.showError=true;
                    console.dir(valid)
             }
             this.getError=function (error) {
                 if(angular.isDefined(error)){
                     return(error.required)?'Поле не должно быть пустым':
                         (error.minValue)?'Поле должно содержать не меньше 3 символов':
                             (error.maxValue)?'Поле должно содержать максимум 10 символов':'';
                 }
             }
         /*
             this.userInfo=null;
             console.log($rootScope)
             if($rootScope.userData){
                 $scope.userInfo=$rootScope.userData
             }else{
                 $scope.userInfo=  $cookies.getObject('test'); //cooki
             }

              console.log($scope.userInfo);
              console.log($cookies.getObject('test'));
             $scope.main= true;*/

           const dbUrl='http://127.0.0.1:2403/error/';
             this.objSend=$resource(dbUrl+':id',{id:'@id'});
//show login
            // if($location)

           /*  $rootScope.urlPath=$location.path();
             $scope.$watch('urlPath',function (newVal, old) {
                 (newVal=='/main')? $scope.main= true: $scope.main= false;



             })
*/
//question get information

         /*    $scope.refresh=function () {
                 $scope.myTascks=$scope.objSend.query();
             };

             $scope.sendStart=function () {
                 // $http.get('./tpl/main/question/db.json').then(function (response) {
                 //     $scope.myTascks=response.data;
                 // })
                 $http.get('./tpl/main/tabContent/myTasc.json').then(function (response) {
                     $scope.dataTabs=response.data;
                 })
             };
             $scope.sendStart();
             $scope.refresh();

                    var url={
                        "Мои Ошибки"           : './tpl/main/table.html',
                        "Все ошибки"           : './tpl/main/tableAll.html',
                        "Принятые в работу"    : './tpl/main/inVorck.html',
                        "Исправленые"          : './tpl/main/fixed.html',
                        "Статистика"           : './tpl/main/statistic.html',
                        "Обратная форма связи" : './tpl/main/callbecForm.html',
                        "О нас"                : './tpl/main/about.html'
                    }
                    //console.log($location.hash())
                    if($location.path()=='/main'&&$location.hash()==''){
                        $scope.url='./tpl/main/table.html';
                    }
                    for(var key in url){
                        // console.log(''+key)
                        // console.log($location.hash())
                        if( key ==$location.hash()){
                            $scope.url=url[key];
                            break;
                        }
                    }
               // console.log($rootScope);
*/
                console.log('adminCtrl');

// switch tabs
//              $interval(function () {
//                  $('#my a').click(function (e) {
//                      e.preventDefault()
//                      $(this).tab('show')
//                      console.log(e.target.innerText)
//                    console.log(e.target.innerText=='Мои Ошибки')
//                      for(var key in url){
//                          // console.log(''+key)
//                          // console.log($location.hash())
//                          if( key ==e.target.innerText){
//                              $scope.url=url[key];
//                              break;
//                          }
//                      }
//                  })
//              },1000);
/*

setTimeout(function () {


        $('#my a').click(function (e) {
            e.preventDefault()
            $(this).tab('show')
            console.log(e.target.innerText)
            console.log(e.target.innerText=='Мои Ошибки')
            $scope.$apply(function () {
                for(var key in url){
                    // console.log(''+key)
                    // console.log($location.hash())
                    if( key ==e.target.innerText){
                        $scope.url=url[key];
                        $scope.page=$scope.url;
                        break;
                    }
                }
            })
        })

},1000)

*/

//edit
       /*         $scope.editPath=function (path) {
                    $location.path(path);
                };
                $scope.edit=function (element) {
                   $scope.url='./tpl/edit.html';
                    $scope.item=angular.copy(element);
                   // console.log($scope.item);
                   // console.log($scope.url);
                    $scope.sendTo($scope.item)
                }

                $scope.sendTo=function (item) {
                    $rootScope.tempItem=item;

                }*/
//delete
           /*  $scope.del=function(item){
                 item.$delete().then(function () {
                     $scope.myTascks.splice($scope.myTascks.indexOf(item),1)
                 })
                 $scope.myTascks.splice($scope.myTascks.indexOf(item),1)
             }
//preview
             $scope.preview=function (item) {
                 $rootScope.previewItem=item;
                 $scope.url='./tpl/preview.html';

             }
          $rootScope.$watch('url',function (newValue,oldValue) {

                 if($rootScope.url){
                     console.log('on table')
                     console.log(newValue)
                     $scope.url='./tpl/main/' + newValue;

                 }

                  for(var key in url){
                      // console.log(''+key)
                      // console.log($location.hash())
                      if( key ==$rootScope.url){
                          $scope.url=url[key];
                          break;
                      }
                  }



                 // $rootScope.url='';
                 // return;
           })*/

             })

