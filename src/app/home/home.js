angular
  .module('home')
  .component('homeList', {
    templateUrl: ['$element', '$attrs', 'isAuthService', ($element, $attrs, isAuthService) => {
      return `app/home/home.html`;
    }],
    controller: homeListController
  });

function homeListController() {
  const vm = this;
}
