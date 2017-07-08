/**
 * Created by mdresvyankin on 08.07.17.
 */
angular
  .module('home')
  .component('addFilm', {
    templateUrl: 'app/home/addFilm.html',
    controller: addFilmController
  });

function addFilmController(filmsService, $state) {
  this.$onInit = () => {
    this.genres = [];
    this.currentYear = new Date().getFullYear();
  };
  this.sendFilm = () => {
    for (const genre of this.genresList) {
      this.genres.push(genre.id);
    }
    const filmDetails = {name: this.name, genres: this.genres, year: this.year};
    filmsService.addFilm(filmDetails).then(() => {
      $state.go('home', {}, {reload: true});
    });
    return true;
  };
}
