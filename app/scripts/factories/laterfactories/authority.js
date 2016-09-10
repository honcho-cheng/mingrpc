'use strict';

/**
 * @ngdoc function
 * @name flatpcApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the flatpcApp
 */
angular.module('mingrpcApp')
.factory('authority', ['$rootScope','AppConfig','$state',function ($rootScope,AppConfig,$state) {
    
    var transform = function(name){
        name = name || "";
        switch (name){
            case "login":
                return ['login'];
            case "index":
                if($rootScope.sysMenu && $rootScope.sysMenu[0]!='login'){
                    return $rootScope.sysMenu;
                }else{
                    var menus = [];
                    if(menuCheck(1)){
                        menus.push('flat');
                        if(menuCheck(6)){
                            menus.push('flat');
                        }else menus.push(' ');
                    }
                    menus.push(' ')
                    return menus;
                }
        }
        return null;
    };
    var check = function () {
        AppConfig.adminId = sessionStorage.adminId;
        AppConfig.token = sessionStorage.token;
        AppConfig.nodeIds = ',' + sessionStorage.nodeIds + ',';
        AppConfig.schoolCode = sessionStorage.schoolCode;
        AppConfig.userName = sessionStorage.userName;
        AppConfig.roleName = sessionStorage.roleName;
        AppConfig.roleId = sessionStorage.roleId;
        AppConfig.userAccount = sessionStorage.userAccount;
        AppConfig.isOpenBed = sessionStorage.isOpenBed;
        
        AppConfig.week = sessionStorage.week || 1;
        AppConfig.month = sessionStorage.month || 1;
        AppConfig.day = sessionStorage.day || 1;
        AppConfig.bed = sessionStorage.bed || 1;
        AppConfig.pass = sessionStorage.pass || 1;
        AppConfig.photo = sessionStorage.photo || 1;
        AppConfig.role = sessionStorage.role || 1;
        AppConfig.takephoto = sessionStorage.takephoto || 1;
        AppConfig.check = sessionStorage.check || 1;
        if(AppConfig.adminId && AppConfig.token && AppConfig.nodeIds && AppConfig.schoolCode && AppConfig.userName && AppConfig.roleName && AppConfig.roleId && AppConfig.userAccount){
            return true;
        }
        else return false;
    }
    var menuCheck = function(menu){
        if(AppConfig.nodeIds.length < 2) $location.path('/login');
        // console.log(AppConfig.nodeIds);
        return new RegExp(',' + menu + ',' ).test(AppConfig.nodeIds);
    }
    return {
        check:check,
        transform:transform,
        menuCheck:menuCheck
    }
}]);
