 // newcontroler
         App.controller('MainCtrl',function ($scope,$resource,$location, $http,$interval,$rootScope,$cookies) {
             var url={};
             $scope.userInfo=null;
             console.log($rootScope)
             if($rootScope.userData){
                 $scope.userInfo=$rootScope.userData
             }else{
                 $scope.userInfo=  $cookies.getObject('test'); //cooki
             }

              console.log($scope.userInfo);
              console.log($cookies.getObject('test'));
             $scope.main= true;

           const dbUrl='http://127.0.0.1:2403/error/';
             $scope.objSend=$resource(dbUrl+':id',{id:'@id'});
//show login
            // if($location)

             $rootScope.urlPath=$location.path();
             $scope.$watch('urlPath',function (newVal, old) {
                 (newVal=='/main')? $scope.main= true: $scope.main= false;



             })

//question get information

             $scope.refresh=function () {
                 $scope.myTascks=$scope.objSend.query();
             };
             $scope.sendStart=function () {
                 $http.get('./tpl/main/tabContent/url.json').then(function (response) {
                    url=response.data;
                 });
                 $http.get('./tpl/main/tabContent/myTasc.json').then(function (response) {
                     $scope.dataTabs=response.data;
                 })
             };
             $scope.sendStart();
             $scope.refresh();
                    //console.log($location.hash())
                    if($location.path()=='/main'&&$location.hash()==''){
                        $scope.url='./tpl/main/table.html';
                    }


                console.log('maincontroller');

// switch tabs

             $scope.action=function () {
                 console.log('testing555')
                 $('#my a').click(function (e) {
                     e.preventDefault()
                     $(this).tab('show')
                     $scope.$apply(function () {
                         for(var key in url){
                             if( key ==e.currentTarget.id){
                                 $scope.url=url[key];
                                 $scope.page=$scope.url;
                                 break;
                             }
                         }
                     })
                 })
             };



//edit
                $scope.editPath=function (path) {
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

                }
//delete
             $scope.del=function(item){
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
           })

             })

