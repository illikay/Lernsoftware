/**
 * 
 */

var app = angular.module("myApplication",[]);
app.controller("rootController",function($scope){
	
	$scope.schoolmaterial = [{"name":"schoolmaterial","content":[]}];
	
	$scope.lectures = $scope.schoolmaterial[0].content;
	$scope.addLecture = function(){
		var lecture = {"name":"lecture-name","content":[]};
		$scope.schoolmaterial[0].content.push(lecture);
		//$scope.lectures = $scope.schoolmaterial[0].content;
	};
	$scope.removeLecture = function(index){
		$scope.lectures.splice(index,1);
	};
	
	$scope.topics = [];
	$scope.addTopic = function(){
		$scope.topics.push({"name":"topic-name"});
	};
	$scope.removeTopic = function(index){
		$scope.topics.splice(index,1);
	};
	
	
});