/**
 * Created by mdresvyankin on 06.07.17.
 */
angular
  .module('login')
  .service('filmsService', filmsService);

function filmsService(isAuthService, $resource, $log, APIHOST) {
  const URLS = {
    filmList: '/api/v1/film',
    rent: '/api/v1/film/rent',
    rentFinish: '/api/v1/film/finish',
    rentedFilm: '/api/v1/rented-film'
  };
  const token = () => {
    isAuthService.authenticated();
    if (isAuthService.token) {
      return isAuthService.token;
    }
    isAuthService.authenticated();
    return isAuthService.token;
  };
  this.token = token();
  /* Create Film $resource */
  this.film = (headers = {}) => {
    return $resource(`${APIHOST}${URLS.filmList}`, {}, {
      get: {method: 'GET'},
      save: {method: 'POST', headers}
    });
  };
  /* Get list of films and assign it to films variable */
  this.filmList = () => {
    return this.film().get().$promise.then(response => {
      this.films = response.result;
      return this.films;
    });
  };

  /* Get list of films and assign it to films variable */
  this.addFilm = filmDetails => {
    if (!this.token) {
      return false;
    }
    return this.film({Authorization: `Bearer ${this.token}`}).save(filmDetails).$promise.then(response => {
      this.films = response.result;
      return this.films;
    });
  };
  /* Create rent $resource */
  this.rent = headers => {
    return $resource(`${APIHOST}${URLS.rent}`, {}, {
      save: {
        method: 'POST', headers}
    });
  };
  /* Start rented film */
  this.rentFilm = id => {
    if (!this.token) {
      return false;
    }
    return this.rent({Authorization: `Bearer ${this.token}`}).save({film_id: id}).$promise.then(response => {
      return response;
    });
  };

/* Create finish rent $resource */
  this.rentFinish = headers => {
    return $resource(`${APIHOST}${URLS.rentFinish}`, {}, {
      update: {method: 'POST', headers}
    });
  };
  /* Finish of  of renting film */
  this.rentFinishFilm = () => {
    if (!this.token) {
      return false;
    }
    return this.rentFinish({Authorization: `Bearer ${this.token}`}).update().$promise.then(response => {
      return response;
    });
  };

  /* Create rented films $resource */
  this.rentedFilm = headers => {
    return $resource(`${APIHOST}${URLS.rentedFilm}`, {}, {
      get: {method: 'GET', headers}
    });
  };

  /* Get list of rentedd films */
  this.rentedFilmList = () => {
    if (!this.token) {
      return false;
    }
    return this.rentedFilm({Authorization: `Bearer ${this.token}`}).get().$promise.then(response => {
      this.rentedFilms = response.result;
      return this.rentedFilms;
    });
  };
  $log.debug(this);
}
