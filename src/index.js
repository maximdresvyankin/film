angular
  .module('app', ['ui.router', 'ngResource', 'ngMaterial', 'ngCookies', 'login', 'home'])
  .constant('APIHOST', 'https://film-api-go.herokuapp.com');
