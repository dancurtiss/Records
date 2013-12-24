//Setting up route
window.app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/records', {
            templateUrl: 'views/records/list.html'
        }).
        when('/records/create', {
            templateUrl: 'views/records/create.html'
        }).
        when('/records/:recordId/edit', {
            templateUrl: 'views/records/edit.html'
        }).
        when('/records/:recordId', {
            templateUrl: 'views/records/view.html'
        }).
        when('/', {
            templateUrl: 'views/index.html'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);

//Setting HTML5 Location Mode
window.app.config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix("!");
    }
]);