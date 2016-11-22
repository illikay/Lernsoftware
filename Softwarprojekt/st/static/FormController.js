
var app = angular.module("formlyApp",[]);
    app.controller('FormController',function($scope,$http) { 
    	//$scope.yourmodel = {};
    	$scope.PostDataResponse ={};
    	$scope.GetDataResponse ={};
    	$scope.userlist = [
    	                   
    	                ];
    	
    	//$scope.PostDataResponse.test ="ok";
    	
    	$scope.hinzufuegen = function() {
	   		$scope.userinfo = $scope.user;
    		$scope.userlist.push(angular.extend({}, $scope.user));
    	//$scope.PostDataResponse.test =$scope.user;
	   var data = $scope.user;
	   $http({
           method: 'post',           
           url: 'http://127.0.0.1:3000/benutzer',
           data: data,
           headers: {'Content-Type': 'application/json'}
         })
         .then(function(response) 
         {
        	   $http.get('http://127.0.0.1:3000/benutzer')
               .then(function (response) {
                $scope.userlist = response.data;
                 })
        	/* $http({
                 method: 'get',           
                 url: 'http://127.0.0.1:3000/benutzer',
                 data: data,
                 headers: {'Content-Type': 'application/json'}
               })
                .then(function(response)
                		{
                 // success
                	 $scope.PostDataResponse.test = response.data;
        	
                		});*/
         }, 
         function(response) 
         { 
             // failed
        	 
         });

	   $scope.loeschen = function() {
		    
	    	//$scope.PostDataResponse.test =$scope.user;
		   var data = $scope.user;
		   $http({
	           method: 'delete',  //method :"post"
	           url: 'http://127.0.0.1:3000/benutzer', //richtige Url ???
	           data: data,
	           headers: {'Content-Type': 'application/json'}
	         })
	         .then(function(response) 
	                 {

	        	   $http.get('http://127.0.0.1:3000/benutzer')
	               .then(function (response) {
	                $scope.userlist = response.data;
	                 })
	                 }, 
	                 function(response) 
	                 { 
	                     // failed
	                	 
	                 });
   }}
    	
    	/* var config = {
                 headers : {
                     'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                 }
             };
    	 
    	 $http.post('http://localhost:3000/benutzer', data, config)
        .success(function (data, status, headers, config) {
        	 
          
        })
        .error(function(data, status, headers, config){
            // handle error here
        	$scope.PostDataResponse.test = "not ok";
        });
    	 }*/
      
      
    });