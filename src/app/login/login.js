/**
 * Created by mdresvyankin on 01.02.17.
 */
angular
  .module('login')
  .component('login', {
    templateUrl: 'app/login/login.html',
    controller: loginController
  });

function loginController(loginService, isAuthService, $cookies, $state, $log) {
  const vm = this;
  vm.goLogin = goLogin;
  vm.showLogin = true;
  function goLogin() {
    if (vm.loginForm.$valid === true) {
      const resource = new loginService.login();
      const toLogin = {
        login: vm.loginForm.login.$viewValue,
        password: vm.loginForm.password.$viewValue
      };
      const goLogin = resource.update({}, toLogin);
      goLogin.$promise.then(response => {
        const token = response.token;
        $cookies.put('token', token);
        isAuthService.authenticated();
        $state.go('home', {}, {reload: true});
      }, error => {
        vm.error = error.data.error;
      });
    }
  }
}
