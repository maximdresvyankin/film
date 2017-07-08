/**
 * Created by mdresvyankin on 08.07.17.
 */
angular
  .module('login')
  .component('logout', {
    templateUrl: 'app/login/logout.html',
    controller: logoutController
  });

function logoutController(isAuthService, $cookies, $state) {
  this.isAuth = isAuthService.authenticated();
  this.goLogout = () => {
    if (this.isAuth === true) {
      $cookies.remove('token');
      $state.go('home', {}, {reload: true});
    }
  };
}
