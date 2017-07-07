/**
 * Created by mdresvyankin on 07.07.17.
 */
angular
  .module('home')
  .component('filmList', {
    templateUrl: ['$element', '$attrs', 'isAuthService', ($element, $attrs, isAuthService) => {
      return `app/home/filmList.html`;
    }],
    controller: filmList
  });

function filmList(filmsService, $log) {
  this.$onInit = () => {
    filmsService.filmList().then(() => {
      this.filmList = filmsService.films;
    });
  };
  this.showAs = 'list';
}
