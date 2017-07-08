angular
  .module('app')
  .config(routesConfig);

angular
  .module('home')
  .config(homeRoutesConfig);

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(false).hashPrefix('!');
  $urlRouterProvider.otherwise('/home');
}

function homeRoutesConfig($stateProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      views: {
        '@': 'home',
        'top@home': 'filmList'
      }
    })
    .state('home.detail', {
      url: '/details/:filmId',
      component: 'filmDetail',
      cache: false
    })
    .state('home.login', {
      url: '/login',
      component: 'login'
    })
    .state('home.register', {
      url: '/register',
      component: 'register'
    })
    .state('home.rented', {
      url: '/rented',
      views: {
        'top@home': 'rentFilm'
      }
    });
}
