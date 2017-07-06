/**
 * Created by mdresvyankin on 01.02.17.
 */
angular
  .module('login')
  .factory('loginService', loginService);

function loginService($q, $resource, $log, APIHOST) {
  const URLS = {
    login: '/login',
    register: '/auth'
  };

  this.currentYear = new Date().getFullYear();

  this.login = () => {
    return $resource(`${APIHOST}${URLS.login}`, {}, {
      update: {method: 'POST'}
    });
  };

  this.register = toSendObject => {
    const defer = $q.defer();
    const register = $resource(`${APIHOST}${URLS.register}`, {}, {
    });
    register.save(toSendObject).$promise.then(response => {
      defer.resolve(response);
      return response;
    }, error => {
      defer.reject(error);
    });
    return defer.promise;
  };

  return this;
}
