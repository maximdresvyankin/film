/**
 * Created by mdresvyankin on 07.07.17.
 */
angular
  .module('home')
  .component('rentFilm', {
    templateUrl: ['$element', '$attrs', 'isAuthService', ($element, $attrs) => {
      return angular.isDefined($attrs.tpl) ? `app/home/rent${$attrs.tpl}.html` : `app/home/rent.html`;
    }],
    controller: rentFilm,
    require: '^filmDetail',
    bindings: {
      filmId: '=filmId'
    }
  });

function rentFilm(filmsService) {
  this.$onInit = () => {
    filmsService.rentedFilmList().then(response => {
      this.list = response;
      this.message = (this.list.length > 0) ? 'Все добре' : 'Все погано, адже API для оренди фільмів не працює';
    });
  };

  this.rentSingleFilm = () => {
    filmsService.rentFilm(this.filmId).then(() => {
      /* Some working code needed */
    });
  };
}
