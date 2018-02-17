(function(){
  // Angular App configuration
    var app = angular.module('adminApp')
    
    app.run(['$state','$rootScope','$location','$cookieStore','$http','$window','$interval',function ($state, $rootScope, $location, $cookieStore, $http, $window, $interval) {
        // keep user logged in after page refresh
        // console.log("page refresh",$window.sessionStorage.getItem('token'));

        if ($cookieStore.get('token')) {
            // $http.defaults.headers.common['TOKEN'] = $window.sessionStorage.getItem('token');
            // $http.defaults.headers.common['USERNAME'] = $window.sessionStorage.getItem('username');
        }
        else if($location.path() !=='/login' && $location.path() !==''){
            // console.log("fgg--",$location.path());
            // alert("Please login again your current session has expired.");
            // $location.path('/login');
        };

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            // console.log("locationChangeStart",event,$window.sessionStorage.getItem('token'));
            if ($location.path() != '/login' && !$cookieStore.get('SessionId')) {
                // console.log("go to login", $location.path(), $window.sessionStorage.getItem('token'));
                // $location.path('/login');
            
            }
        });
    }]);
    app.config(['NotificationProvider',function(NotificationProvider) {
        NotificationProvider.setOptions({
            delay: 2000,
            // startTop: 20,
            // startRight: 10,
            // verticalSpacing: 20,
            // horizontalSpacing: 20,
            // positionX: 'top',
            // positionY: 'right'
        });
    }]);
    app.config(['$logProvider', function($logProvider){
        $logProvider.debugEnabled(false);
    }]);
    app.config(['$ocLazyLoadProvider',function($ocLazyLoadProvider) {
    	$ocLazyLoadProvider.config({
    		'debug': true,
        'events': true
    	});
    }]);
    
})();