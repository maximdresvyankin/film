/**
 * Created by mdresvyankin on 06.07.17.
 */
angular
  .module('login')
  .component('register', {
    templateUrl: 'app/login/register.html',
    controller: registerController,
    bindings: {
      showLogin: '='
    },
    require: '^loginController'
  });

function registerController(loginService, $log) {
  const vm = this;

  vm.goRegister = () => {
    if (vm.registerForm.$valid === true) {
      const toRegister = {
        username: vm.username,
        password: vm.password,
        login: vm.login,
        age: vm.age,
        telephone: vm.telephone
      };
      loginService.register(toRegister).then(response => {
        $log.debug(response);
      });
    }
  };
}
