 // new controler

         App.controller('MainCtrl',function ($scope) {

             $('#my-tab a').click(function (e) {
                 e.preventDefault()
                 $(this).tab('show')
             })



          /*  console.log($('main controller'));
         $('main_container').click(function(e){
             console.log(e);
             $(this).toggleClass('active')
         })*/


            })