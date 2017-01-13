App.directive('tabs',['$resource','$location','$http',function ($resource,$location,$http) {
    return{
        restrict: "A",
        replace: true,
        link: function(scope,element,attr){

        },
        templateUrl: './tpl/admin/adminMain.html'
    }
}]);
App.directive('modal',function () {
    return{
        restrict: "A",
        replace: true,
        scope:true,
        link: function(scope,element,attr){
            scope.goToFixed=function (item) {
                scope.$emit('goToFixed',{
                    message:item
                });
            };
            scope.Fixed=function (item) {
                console.log('fixeddd')
                scope.$emit('Fixed',{
                    message:item
                });
            }
            scope.$on('prevModal',function (event,args) {
                scope.prevData=args.prevData;

            });
            scope.$on('changeUrl',function (event,args) {
                    scope.url=args.message;
                console.log('URL----',args.message)
                scope.setVariebel(scope.url)

            })
            scope.setVariebel= function (url) {
                if(url=='./tpl/admin/main/tasks.html'){
                    scope.event='Отправить в обработку'
                    scope.default=true;
                }else if(url=='./tpl/admin/main/inVorks.html'){
                    scope.event='Исправлен'
                }else if(url=='./tpl/admin/main/fixed.html'){
                    scope.event='Исправлен'
                }
            }

        },
        templateUrl:'./tpl/admin/main/modal.html'
    }
});
 // new controler

         App.controller('AdminMainCtrl',function ($scope,$resource,$location, $http,$interval,$rootScope,$cookies) {
             $scope.adminMain= this;
             this.showUsers=true;
             if($location.path()=='/admin/main'&&$location.hash()==''){
                 this.url='./tpl/admin/main/user.html';
             }

             this.dbUrl='http://127.0.0.1:2403/user/';
             this.dbUrlError='http://127.0.0.1:2403/error/';
             this.objSendUser=$resource(this.dbUrl+':id',{id:'@id'});
             this.objSendError=$resource(this.dbUrlError+':id',{id:'@id'});
             this.Tascks=this.objSendError.query();
             $http.get('./tpl/admin/tabContent/adminMyTasc.json').then(function (response) {
                 $scope.adminMain.dataTabs=response.data;

             });


             this.tabs={"a_tab-0"   : "./tpl/admin/main/user.html",
                 "a_tab-1"   : "./tpl/admin/main/tasks.html",
                 "a_tab-2"   : "./tpl/admin/main/inVorks.html",
                 "a_tab-3"   : "./tpl/admin/main/fixed.html",
                 "a_tab-4"   : "./tpl/admin/main/statistic.html",
                 "a_tab-5"   : "./tpl/admin/main/create.html",
                   "prev"    :"./tpl/admin/main/prev.html"};




        this.action=function () {
            $('#my a').click(function (e) {
                var i=0;
                e.preventDefault();
                $(this).tab('show');
                $scope.$apply(function () {
                    for(var key in $scope.adminMain.tabs){
                        i++;
                        if(e.currentTarget.id==key){
                            $scope.adminMain.url=$scope.adminMain.tabs[key];
                            break;
                        }
                    }
                    $scope.$broadcast('changeUrl',{
                        message:$scope.adminMain.url
                    })
                })

            })
        };
//change tabs show
        this.showTab=function (item) {
            this.userInfo=item;
            this.showUsers=false;
            this.showUsersEdit=true;
            this.url='./tpl/admin/main/edit.html';

        };
//change user
        this.quireReg=function (data) {
            console.log('this is pass',data.password)
            if(data.password==undefined){
                delete data.password
            }else{
                data.password=md5(data.password)
            }
            data.$save();
            this.url='./tpl/admin/main/user.html';
        };
// modal
        this.setData=function (data) {
            $scope.adminMain.t=data;
        }
        this.dish=function (item) {
            $rootScope.$broadcast('prevModal',{
                prevData:item
            });
            $('#prevModal').modal();

        };
        $scope.$on('goToFixed',function (event,argum) {
            $scope.adminMain.goToFixed(argum.message)

        });
             $scope.$on('Fixed',function (event,argum) {
                 $scope.adminMain.Fixed(argum.message)
             });
             function serchInArr(serchElem,whereSerch) {
                 var i=0;
                 for(i;i<whereSerch.length;i++){
                     if(whereSerch[i].id ==serchElem.id){
                         whereSerch.splice(i,1);
                         break;

                     }
                 }
             }
            this.goToFixed=function(item){
                item.status=1;
                item.date=new Date().getHours()+':'+ new Date().getMinutes() +' - '+ new Date().getDate()+ '.'+(new Date().getMonth()+1)+'.'+new Date().getFullYear();
            item.$save();
                serchInArr(item,this.Tascks)
            };

        this.Fixed=function (item) {
            item.status=0;
            item.date=new Date().getHours()+':'+ new Date().getMinutes() +' - '+ new Date().getDate()+ '.'+(new Date().getMonth()+1)+'.'+new Date().getFullYear();
            item.$save();
            serchInArr(item,this.Tascks)
        };
this.openAgain=function (item) {
    item.status=1;
    item.date=new Date().getHours()+':'+ new Date().getMinutes() +' - '+ new Date().getDate()+ '.'+(new Date().getMonth()+1)+'.'+new Date().getFullYear();
    item.$save();
    serchInArr(item,this.Tascks)
}






             $scope.adminMain.test='adminMainTest111';

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
                console.log('adminMainCtrl');

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

