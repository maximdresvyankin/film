/**
 * Created by mdresvyankin on 01.02.17.
 */
angular
  .module('home')
  .component('home', {
    templateUrl: ['$element', '$attrs', 'isAuthService', ($element, $attrs, isAuthService) => {
      return `app/home/home.html`;
    }],
    controller: homeController
  });

function homeController() {
  const vm = this;
}
