 // new controler

         App.controller('MainCtrl',function ($scope) {

             $('#my-tab a').click(function (e) {

                 $(this).toggleClass('active')

                 e.preventDefault()
             })



          /*  console.log($('main controller'));
         $('main_container').click(function(e){
             console.log(e);
             $(this).toggleClass('active')
         })*/


            })