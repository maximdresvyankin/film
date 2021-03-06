/**
 * Created by mdresvyankin on 07.07.17.
 */
angular
  .module('home')
  .component('homeHeader', {
    templateUrl: `app/home/homeHeader.html`,
    controller: homeHeaderController
  });

function homeHeaderController(isAuthService, $filter) {
  const vm = this;
  const menu = [
    {
      id: 2,
      state: 'home.login',
      name: 'Вхід',
      registered: false,
      unRegistered: true
    },
    {
      id: 3,
      state: 'home.register',
      name: 'Реєстрація',
      registered: false,
      unRegistered: true
    },
    {
      id: 1,
      state: 'home',
      name: 'Головна',
      registered: true,
      unRegistered: true
    }, {
      id: 4,
      state: 'home.rented',
      name: 'Орендовані фільми',
      registered: true,
      unRegistered: false
    }, {
      id: 5,
      state: 'home.add',
      name: 'Додати фільм',
      registered: true,
      unRegistered: false
    }];
  vm.isAuth = isAuthService.authenticated() ? {registered: true} : {unRegistered: true};
  vm.showMenu = $filter('filter')(menu, vm.isAuth);
}
