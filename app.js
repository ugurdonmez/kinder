angular.module('kinder-app', [
    'ui.bootstrap',
    'ui.utils',
    'ngRoute',
    'ngAnimate',
    'ui.select',
    'ngFileUpload',
    'firebase',
    'ngMaterial',
    'ngCookies',
    'ngResource',
    'ui.router']);

angular.module('kinder-app').config(function ($routeProvider) {
    $routeProvider.when('/add-branch', {templateUrl: 'branch/view/add_branch.html'});
    $routeProvider.when('/add-school', {templateUrl: 'school/views/add/school-add.html'});
    $routeProvider.when('/update-school/:schoolId', {templateUrl: 'school/views/update/school-update.html'});
    $routeProvider.when('/list-schools', {templateUrl: 'school/views/list/schools-list.html'});
    $routeProvider.when('/admin-signup', {templateUrl: 'admin/views/signup/admin-signup.html'});
    $routeProvider.when('/admin-login', {templateUrl: 'admin/views/login/admin-login.html'});
    $routeProvider.otherwise({redirectTo: '/list-schools'});
});

angular.module('kinder-app').config(function ($stateProvider, USER_ROLES) {
    $stateProvider.state('dashboard', {
        url: '/dashboard',
        templateUrl: 'dashboard/index.html',
        data: {
            authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
        }
    });
});

var appSettings = {

};

angular.module('kinder-app').run(function ($rootScope, $location, AUTH_EVENTS, AuthService) {

    $rootScope.appSettings = _.defaults(appSettings, {});

    $rootScope.safeApply = function (fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };
    
    $rootScope.$on('$stateChangeStart', function (event, next) {
        
        var authorizedRoles = next.data.authorizedRoles;
        if (!AuthService.isAuthorized(authorizedRoles)) {
            event.preventDefault();
            if (AuthService.isAuthenticated()) {
                // user is not allowed
                $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
            } else {
                // user is not logged in
                $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
            }
        }
    });
});

angular.module('kinder-app').config(function ($httpProvider) {
  $httpProvider.interceptors.push([
    '$injector',
    function ($injector) {
      return $injector.get('AuthInterceptor');
    }
  ]);
});

angular.module('kinder-app').factory('AuthInterceptor', function ($rootScope, $q,
                                      AUTH_EVENTS) {
  return {
    responseError: function (response) { 
      $rootScope.$broadcast({
        401: AUTH_EVENTS.notAuthenticated,
        403: AUTH_EVENTS.notAuthorized,
        419: AUTH_EVENTS.sessionTimeout,
        440: AUTH_EVENTS.sessionTimeout
      }[response.status], response);
      return $q.reject(response);
    }
  };
});


angular.module('kinder-app').service('TranslationService', function($resource) {
    this.getTranslation = function($scope, language) {
        var languageFilePath = 'translation/translation_' + language + '.json';
        $resource(languageFilePath).get(function (data) {
            $scope.translation = data;
        });
    };
});

// Manual bootstrap of the application
angular.element(document).ready(function() {

    var $http = angular.bootstrap().get('$http');

    // Overwrites default settings if a local-settings.json file exists in the top root folder
    $http
        .get("local-settings.json")
        .then(function (response) {
            appSettings = response.data;

            angular.bootstrap(document, ['kinder-app']);
        });

});
