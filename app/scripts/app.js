'use strict';

/**
 * @ngdoc overview
 * @name flatpcApp
 * @description
 * # flatpcApp
 *
 * Main module of the application.
 */
angular
  .module('mingrpcApp', [
    //'ngAnimate',
    // 'ngCookies',
    // 'ngResource',
    // 'ngSanitize',
    'ui.router',
    // 'ngTouch',
    'frapontillo.bootstrap-switch'
  ])
  .constant('AppConfig',{
      WEB_ROOT:'http://10.5.8.59:8080/Geese_Apartment/',
    //   WEB_ROOT:'http://ap.houqinbao.com/Geese_Apartment/',
    // WEB_ROOT_MESSAGE:'http://120.55.84.193/Geese_Quality_Supervision/',
      schoolCode:0,
	  token:'',
      adminId:0,
      nodeIds:''
  }).run(['$rootScope', '$location', 'AppConfig','authority','$stateParams','$http',
		function($rootScope, $location, AppConfig,authority,$stateParams,$http) {
            //侧边栏收缩控制
            var w = document.documentElement.clientWidth||document.body.clientWidth;
            if(w < 1024) $rootScope.miniAside = true;
            
            $rootScope.routerInit = function(menu){
                $rootScope.sysMenu = [menu,menu,""];
            }
            $rootScope.menuCheck = authority.menuCheck;
            $rootScope.authority = '';
			$rootScope.$on('$stateChangeStart',
				function(event, toState, toParams, fromState, fromParams) {
                    if(authority.check()){
                        $rootScope.loginSwitch = true;
                    }else{
                        $location.path('/login');
                    }
                    $rootScope.sysMenu = authority.transform(toState.name);
                    $rootScope.loading = true;
                    // console.log(AppConfig.nodeIds)
            });
            $rootScope.$on('$stateChangeSuccess',
				function(event, toState, toParams, fromState, fromParams) {
                    
                    if(!$rootScope.sysMenu)$location.path('/index');

            });
            $rootScope.$on('$stateChangeError', 
                function(event, toState, toParams, fromState, fromParams, error){ 
                    sweetAlert("页面加载出错", "错误信息：" + error.status, "error");
            });
			
		}
	])
  .config(function ($stateProvider,$urlRouterProvider) {
    $stateProvider
    .state('login', {
        url: "/login",
        views: {
            "login": {
                templateUrl: 'views/laterviews/login.html',
                controller: 'LoginCtrl'
            }
        }
    })
    .state('index', {
        url: "/index?p",
        views: {
            "": {
                templateUrl: 'views/laterviews/menu.html',
                controller: 'MenuCtrl'
            },
            "aside": {
                templateUrl: "views/laterviews/aside.html",
                controller: 'AsideCtrl'
            },
           
        }
    })

    $urlRouterProvider.otherwise('/login');
  });
  
Date.prototype.Format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month 
        "d+": this.getDate(), //day 
        "h+": this.getHours(), //hour 
        "m+": this.getMinutes(), //minute 
        "s+": this.getSeconds(), //second 
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter 
        "S": this.getMilliseconds() //millisecond 
    }

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}