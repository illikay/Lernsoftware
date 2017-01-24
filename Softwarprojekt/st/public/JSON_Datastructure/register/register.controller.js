(function () {
    'use strict';
 
    angular
        .module('myApp')
        .controller('RegisterController', RegisterController);
 
    //RegisterController.$inject = ['$http', '$location', '$rootScope'];
    function RegisterController($http,$rootScope,$scope) {
        //var vm = this;
 
        //vm.register = register;
        
        $rootScope.register = function () {
        	var data = $scope.vm.user;
            
        	$http({
        		  url: '/api/signup',
        		  method: 'POST',
        		  data: data,
        		  headers: {
        		    'Content-Type': 'application/json' // Note the appropriate header
        		  }
        		}).then(function(response) 
        				{

   	        	 //$http.get('/api/signup')
   	        	 //.then(function (response) {
   	        		$rootScope.rg_success = true;
                    $rootScope.Registration_mss = response.data;
                   	//})
        		         {
        			
   	         }}, 
   	         function(response) 
   	         { 
   	             // failed
   	        	$rootScope.rg_success = true;
                $rootScope.Registration_mss ="Registration unsuccessful";
               
   	         });
        		
        	/*$http.post('/api/signup', { username: username, password: password,lastname: lastname, firstname: firstname })
            .success(function (response) {
         	   
         	// login successful if there's a token in the response
                if (response.token) {
                    // store username and token in local storage to keep user logged in between page refreshes
                    $localStorage.currentUser = { username: username, token: response.token };

                    // add jwt token to auth header for all requests made by the $http service
                    $http.defaults.headers.common.Authorization = 'Bearer ' + response.token;

                    // execute callback with true to indicate successful login
                    callback(true);
                } else {
                    // execute callback with false to indicate failed login
                    callback(false);
                }
            });
        	
           /* vm.dataLoading = true;
            UserService.Create(vm.user)
                .then(function (response) {
                    if (response.success) {
                        FlashService.Success('Registration successful', true);
                        $rootScope.rg_success = true;
                        $rootScope.Registration_mss ="Registration successful";
                       
                    } else {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                        
                    }
                });*/
        }
    }
 
})();