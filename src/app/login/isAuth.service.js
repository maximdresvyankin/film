/**
 * Created by mdresvyankin on 09.03.17.
 */
(function () {
  angular
    .module('login')
    .factory('isAuthService', isAuthService);

  function isAuthService($cookies, $log) {
    // Set or Unset Credentials Block
    $log.debug($cookies);
    this.authenticated = () => {
      this.token = $cookies.get('token');
      return Boolean(this.token);
    };
    return this;
  }
})();
