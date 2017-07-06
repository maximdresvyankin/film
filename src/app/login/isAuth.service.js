/**
 * Created by mdresvyankin on 09.03.17.
 */
(function () {
  angular
    .module('login')
    .factory('isAuthService', isAuthService);

  function isAuthService($q, $cookies, loginService, $log) {
    // Start init
    let identification = false;
    const obj = {};
    const credentials = ["bilinkAgreement", "bilinkToken", "bilinkRole"];

    // Set or Unset Credentials Block
    const setOrUnsetCredentials = params => {
      const action = params.action;
      for (const param of params.credentials) {
        switch (action) {
          case "set":
            obj[param] = (loginService[param]) ? loginService[param] : $cookies.get(param);
            break;
          case 'delete':
            $cookies.remove(param);
            delete obj[param];
            break;
          default:
            break;
        }
      }
    };

    obj.setOrUnsetCredentials = setOrUnsetCredentials;

    // Validation Token
    const checkTokenValid = () => {
      let action;
      const bilinkToken = $cookies.get('bilinkToken');
      const resource = new loginService.isAuth();
      return resource.update({bilinkToken}).$promise.then(() => {
        action = 'set';
        setOrUnsetCredentials({credentials, action});
        obj.authenticated = true;
        return true;
      }, () => {
        action = 'delete';
        setOrUnsetCredentials({credentials, action});
        obj.authenticated = false;
        return false;
      });
    };

    obj.checkTokenValid = checkTokenValid;


    // check if All cookies present
    obj.identity = () => {
      const defer = $q.defer();
      identification = Boolean($cookies.get('bilinkToken')) && Boolean($cookies.get('bilinkAgreement')) && Boolean($cookies.get('bilinkRole'));
      if (!identification) {
        const action = "delete";
        setOrUnsetCredentials({credentials, action});
        defer.reject('error');
      }
      defer.resolve(identification);
      return defer.promise;
    };

    // Check if Authenticated can return true or false based on result of checkTokenValid function
    obj.isAuthenticated = function () {
      const defer = $q.defer();
      if (angular.isDefined(obj.authenticated) && obj.authenticated) {
        obj.identity().then(response => {
          obj.identification = response;
          defer.resolve(obj.authenticated);
        });
      } else {
        checkTokenValid().then(response => {
          if (response) {
            obj.identity().then(response => {
              obj.identification = response;
              obj.authenticated = true;
              defer.resolve(obj.authenticated);
            });
          } else {
            obj.authenticated = false;
            defer.reject(obj.authenticated);
          }
        });
        $log.debug("deffer",defer);
        return defer.promise;
      }
    };

    return obj;
  }
})();
