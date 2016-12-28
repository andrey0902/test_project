  // new router
  App
      .config(function ($routeProvider, $locationProvider) {

          $routeProvider
          .when('/',{
              templateUrl: '/tpl/form.tpl',
              controller: "AppCtrl"
          })
          .when('/main',{

              templateUrl:'/tpl/main.html',

          })
              .when('/create',{

                  templateUrl:'/tpl/create.html',
                  controller: 'CreateCtrl'
              })
              .when('/edit',{

                  templateUrl:'/tpl/edit.html',
                  controller: 'EditCtrl'
              })
              .when('/remove',{

                  templateUrl:'/tpl/remove.html',
                  controller: 'RemoveCtrl'
              })
              .when('/send',{

                  templateUrl:'/tpl/send.html',
                  controller: 'SendCtrl'
              })
              .otherwise({
                  redirectTo: '/404'
              })
  });