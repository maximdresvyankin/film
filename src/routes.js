angular
  .module('app')
  .config(routesConfig);

angular
  .module('home')
  .config(homeRoutesConfig);

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(false).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('app', {
      url: '/',
      component: 'login'
    });
}

function homeRoutesConfig($stateProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      component: 'home'
    });
}
