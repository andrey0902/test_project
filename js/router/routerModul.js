  // new router
 /* app
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
  });*/




  angular.module('app').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider)  {

      $urlRouterProvider
          .otherwise('/tasks/error');

      $stateProvider
          .state('login', {
              url: '/login',
              template: '<login></login> ',
          })
          .state('register', {
              url: '/register',
              template: '<register></register> ',
          })
          .state('recovery', {
              url: '/recovery',
              template: '<recovery></recovery> ',
          })
          .state('tasks', {
              abstract: true,
              url: '/tasks',
              template: '<tasks></tasks>'
          })
          .state('tasks.error', {
          url: '/error',
          template: '<error></error>'
          })
          .state('tasks.send-to-work', {
              url: '/sendToWork',
              template: '<send-to-work></send-to-work>'
          })
          .state('tasks.in-work', {
              url: '/inWork',
              template: '<in-work></in-work>'
          })
          .state('tasks.done', {
              url: '/done',
              template: '<done></done>'
          })
          .state('tasks.feedback-form', {
              url: '/feedbackForm',
              template: '<feedback-form></feedback-form>'
          })
          .state('tasks.about-my', {
              url: '/aboutMy',
              template: '<about-my></about-my>'
          })
          .state('tasks.statistics', {
              url: '/statistics',
              template: '<statistics></statistics>'
          })
          .state('tasks.edit', {
              url: '/edit/:id',
              template: '<edit></edit>'
          })
          .state('tasks.create', {
              url: '/create',
              template: '<create></create>'
          })
          .state('tasks.preview', {
              url: '/:preview/:id',
              template: '<preview></preview>'
          })
          .state('adminLogin', {
              url: "/admin/login",
              template: '<admin-login></admin-login>'
          })
          .state('admin', {
              abstract: true,
              url: '/admin',
              template: '<admin-main></admin-main>',
          })
          .state('admin.users', {
              url: '/users',
              template: '<users></users>'
          })
          .state('admin.edit', {
              url: '/edit/:id',
              template: '<edit-user></edit-user>'
          })
          .state('admin.a-send-to-work', {
              url: '/send-to-work',
              template: '<a-send-to-work></a-send-to-work>'
          })
          .state('admin.preview', {
              url: '/:preview/:id',
              template: '<admin-preview></admin-preview>'
          })
          .state('admin.in-work', {
              url: '/inWork',
              template: '<admin-in-work></admin-in-work>'
          })
          .state('admin.done', {
              url: '/done',
              template: '<admin-done></admin-done>'
          })
          .state('admin.statistics', {
              url: '/statistics',
              template: '<admin-statistics></admin-statistics>'
          })
          .state('admin.create-tasks', {
              url: '/creates',
              template: '<users-create></users-create>'
          })
          .state('admin.create-task', {
              url: '/create',
              template: '<admin-create></admin-create>'
          });



  }]);

 angular.module('app').run(function($rootScope, $state, users){
      $rootScope.$on('$stateChangeStart', function(event, toState){
          let name = toState.name;

          if(name !=='adminLogin' && name !== 'login' && name !== 'register' && name !== 'recovery' && !users.inLogin()){
              event.preventDefault();

              $state.go('login');
          }
      });
  });







 /* let ROUTES;
angular.factory(['$stateProvider', function(dbgetData, $stateProvider){
   console.log('this is run', dbgetData);


   dbgetData.getModules().$promise.then((response) => {
       ROUTES = response;
       ROUTES.forEach((item)=>{

       })
   })


}]);*/

 /* let ROUTES;
  ((dbgetData)=>{
      ROUTES = dbgetData.getModules();
  })()

  */
/*
  angular.forEach(ROUTES, (item)=>{
      console.log('create router--------');
      $stateProvider
          .state(item.title, {
              url: '/' + item.title,
              template: '<h2>' + item.name + ' template + item.title</h2>'
          })
  });*/
