'defer'
 // new controler

         App.controller('MainCtrl',function ($scope,$resource,$location, $http) {
           /*  $scope.dataTabs=[{"id":"0","name":"Мои Ошибки","value":"<div class='btn btn-group-justified'><a href='#!/create'class='btn btn-success'> создать задачу </a><a href='#!/remove' class='btn btn-danger'> удалить </a><a href='#!/send' class='btn btn-primary'> отправить в обработку </a></div><div id='table-content' ></div>"},
                 {"name":"Все ошибки","value":"<div>"},
                 {"name":"Принятые в работу","value":"<div>"},
                 {"name":"Исправленые","value":"<div>"},
                 {"name":"Статистика","value":"<div>"},
                 {"name":"Обратная форма связи","value":"<div>"},
                 {"name":"О нас","value":"<div>"}];*/

             $scope.sendStart=function () {
                 $http.get('./tpl/main/question/db.json').then(function (response) {
                     $scope.myTascks=response.data;
                 })
                 $http.get('./tpl/main/tabContent/myTasc.json').then(function (response) {
                     $scope.dataTabs=response.data;
                 })
             };

             $scope.sendStart();
                    var url={
                        "tab-0": './tpl/main/table.html',
                        "tab-1": './tpl/main/tableAll.html'
                    }
                    console.log($location.hash())
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
                console.log($scope.url)



             window.addEventListener('load',function () {
                 console.log($('#tabContent-0'))
                 console.log('zagryz')
                 $('#tabContent-0').html($scope.dataTabs[0].value);
                 $scope.setUrl=function () {
                     console.log($('#tabs-0').hasClass('active'))
                     if($('#tabs-0').hasClass('active')){
                         console.log('yas')
                         return 'table.html';
                     }
                 }
                 $scope.url=$scope.setUrl();
                 console.log($scope.url)
             })

             })

          /*  console.log($('main controller'));
         $('main_container').click(function(e){
             console.log(e);
             $(this).toggleClass('active')
         })*/

window.addEventListener('load',function () {
    console.log('lllllllaaaaaaa')

    setTimeout(function () {

        $('#my a').click(function (e) {
            e.preventDefault()
            $(this).tab('show')
        })

    },1000)

})
