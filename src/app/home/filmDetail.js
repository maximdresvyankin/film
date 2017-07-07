/**
 * Created by mdresvyankin on 06.07.17.
 */
angular
  .module('home')
  .component('filmDetail', {
    templateUrl: ['$element', '$attrs', 'isAuthService', ($element, $attrs, isAuthService) => {
      return `app/home/detail.html`;
    }],
    controller: filmDetail,
    require: '^filmList'
  });

function filmDetail(filmsService, $window, $stateParams, $filter, isAuthService) {
  this.$onInit = () => {
    this.filmId = $stateParams.filmId;
    if (angular.isUndefined(filmsService.films)) {
      filmsService.filmList().then(() => {
        this.film = $filter('filter')(filmsService.films, {id: this.filmId})[0];
      });
    } else {
      this.film = $filter('filter')(filmsService.films, {id: this.filmId})[0];
    }
    $window.scrollTo(0, 0);
  };
  this.isAuth = isAuthService.authenticated();
}
