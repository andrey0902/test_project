  // new router
  App
      .config(function ($routeProvider) {
          $routeProvider
          .when('/',{
              templateUrl: '/tpl/form.tpl',
              controller: "AppCtrl"
          })
          .when('/main',{

              templateUrl:'/tpl/main.html',
              controller: 'MainCtrl'
          })
              .otherwise({
                  redirectTo: '/404'
              })
  });