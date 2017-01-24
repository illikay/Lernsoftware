
(function () {
    'use strict';
 
    angular
        .module('myApp')
        .controller('LoginController', LoginController);
 
    //LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService'];
    
    function LoginController($location,$rootScope,AuthenticationService, FlashService) {
     var vm = this;
    
        vm.login = login;
 
        (function initController() {
            // reset login status
         
            AuthenticationService.ClearCredentials();
        })();
        //testdaten username:baotran1 , password:1111
        function login() {
            
            AuthenticationService.Login(vm.username, vm.password, function (response) {
                if (response.success) {
                	 //AuthenticationService.ClearCredentials();
                    AuthenticationService.SetCredentials(vm.username, vm.password);
                	//$rootScope.user = vm.username;
                	//$rootScope.isVisible1 = false;
                	$rootScope.isVisibleLogout = true;
                	$rootScope.isVisibleLogin = true;
                	$rootScope.isVisibleUser = true;
                    $location.path('/teacher');
                } else {
                	//$rootScope.user = vm.username;
                    //FlashService.Error(response.message);
                    //vm.dataLoading = false;
                  $rootScope.showERR = true;
                     $rootScope.loginmessageERR= 'Username or password is incorrect';
                     //$rootScope.isVisible = true;
                     $rootScope.isVisibleLogin = false;
                }
            });
        };
    }
 
})();