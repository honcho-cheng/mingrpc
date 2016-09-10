angular.module('mingrpcApp')
  .controller('MenuCtrl', ['$scope','$rootScope','AppConfig','$stateParams',function ($scope,$rootScope,AppConfig,$stateParams) {
    $rootScope.loading = false;
    if($stateParams.p){
        var menus = [];
        switch($stateParams.p){
            case 'flat':
                if($rootScope.menuCheck(1)){
                    menus.push('flat');
                    if($rootScope.menuCheck(6)){
                        menus.push('flat');
                    }else if($rootScope.menuCheck(7)){
                        menus.push('grade');
                    }else if($rootScope.menuCheck(8)){
                        menus.push('check');
                    }else menus.push(' ');
                }
                break;
        }
        if(menus.length>0){
            $rootScope.sysMenu = menus;
            console.log(menus);
        }
    }
  }]);