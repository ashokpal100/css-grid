
(function(){
  // Angular App Routers
    angular.module('adminApp').config(['$ocLazyLoadProvider','$stateProvider','$urlRouterProvider','$locationProvider',function($ocLazyLoadProvider,$stateProvider, $urlRouterProvider,$locationProvider) {
        
        $locationProvider.html5Mode({enabled: true});
        $urlRouterProvider.otherwise('/login');
    
        $stateProvider
            .state('login', {
                url:'/login',
                templateUrl: 'views/login/login.html',
                controller: 'LoginCtrl',
                resolve: {
                  loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                      name:'adminApp',
                      files:[
                      'views/login/login.js',
                      'views/login/login.css'
                      ]
                    })
                  }]
                }
            })
            .state('dashboard', {
                url:'/dashboard',
                templateUrl: 'views/dashboard/main.html',
                controller: 'MainCtrl',
                resolve: {
                  loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                      name:'adminApp',
                      files:[
                      'views/dashboard/main.js'
                      ]
                    })
                  }]
                }
            })
            .state('dashboard.home',{
                url:'/home',
                controller: 'HomeCtrl',
                templateUrl:'views/dashboard/home/home.html',
                resolve: {
                  loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                      name:'adminApp',
                      files:[
                      'views/dashboard/home/home.js',
                      'views/dashboard/home/home.css'
                      ]
                    })
                  }]
                }
            });
    }])
})();