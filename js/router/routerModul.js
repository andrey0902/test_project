  // new router
  App
      .config(function ($routeProvider, $locationProvider) {

          $routeProvider
          .when('/',{
              templateUrl: '/tpl/form.html',
              controller: "AppCtrl"
          })
          .when('/main',{

              templateUrl:'/tpl/main.html'
          })
              .when('/create',{
                  templateUrl:'/tpl/create.html',
                  controller: 'CreateCtrl'
              })
              .when('/admin',{
                  templateUrl:'/tpl/admin/admin.html'
              })
              .when('/admin/main',{
                  templateUrl:'/tpl/admin/adminMain1.html'
              })
              .when('/admin/create',{
                  templateUrl:'/tpl/admin/create.html'
              })
              .when('/send',{
                  templateUrl:'/tpl/send.html',
                  controller: 'SendCtrl'
              })
              .otherwise({
                  redirectTo: '/404',
                  templateUrl: '/tpl/form.html'
              })
  });