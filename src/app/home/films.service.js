/**
 * Created by mdresvyankin on 06.07.17.
 */
angular
  .module('login')
  .service('filmsService', filmsService);

function filmsService($q, $resource, $log, APIHOST) {
  const URLS = {
    filmList: '/api/v1/film',
    rent: '/api/v1/rent',
    rentFinish: '/api/v1/finish',
    rentedFilm: '/api/v1/rented-film'
  };

  /* Create Film $resource */
  this.film = () => {
    return $resource(`${APIHOST}${URLS.filmList}`, {}, {
      get: {method: 'GET'},
      update: {method: 'POST'}
    });
  };
/* Get list of films and assign it to films variable */
  this.filmList = () => {
    return this.film().get().$promise.then(response => {
      this.films = response.result;
      return this.films;
    });
  };
  /* Create rent $resource */
  this.rent = () => {
    return $resource(`${APIHOST}${URLS.rent}`, {}, {
      get: {method: 'GET'}
    });
  };
/* Create finish rent $resource */
  this.rentFinish = () => {
    return $resource(`${APIHOST}${URLS.rentFinish}`, {}, {
      get: {method: 'GET'}
    });
  };
  /* Create rented films $resource */
  this.rentedFilm = () => {
    return $resource(`${APIHOST}${URLS.rentedFilm}`, {}, {
      get: {method: 'GET'}
    });
  };
}
