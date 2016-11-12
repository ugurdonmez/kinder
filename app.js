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
    'ngResource']);

angular.module('kinder-app').config(function ($routeProvider) {
    $routeProvider.when('/add-branch', {templateUrl: 'branch/view/add_branch.html'});
    $routeProvider.when('/add-school', {templateUrl: 'school/views/add/school-add.html'});
    $routeProvider.when('/update-school/:schoolId', {templateUrl: 'school/views/update/school-update.html'});
    $routeProvider.when('/list-schools', {templateUrl: 'school/views/list/schools-list.html'});
    $routeProvider.otherwise({redirectTo: '/add-school'});
});


var appSettings = {

};

angular.module('kinder-app').run(function ($rootScope, $location) {

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

