'defer'
 // new controler

         App.controller('MainCtrl',function ($scope,$resource,$location, $http,$interval,$rootScope) {
           const dbUrl='http://127.0.0.1:2403/error/';
             $scope.objSend=$resource(dbUrl+':id',{id:'@id'});
//question get information
             $scope.refresh=function () {
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
                        "Мои Ошибки": './tpl/main/table.html',
                        "Все ошибки": './tpl/main/tableAll.html',
                        "Принятые в работу": './tpl/main/inVorck.html'
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
               // console.log($scope.url);
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
                        break;
                    }
                }
            })
        })

},1000)


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
                 // item.$delete().then(function () {
                 //     $scope.myTascks.splice($scope.myTascks.indexOf(item),1)
                 // })
                 $scope.myTascks.splice($scope.myTascks.indexOf(item),1)
             }



             })

