	var app = angular.module("myApp", ["ngDragDrop"])
	
	
	app.controller("LehrerCtrl", function($scope,$timeout,$filter) {

	    $scope.lehrplan ={ 
	    		dropvalue : "true",
	    		content : [ 	{title : "Thema",id: 1, content : [
	    							{title : "Kapitel",id: 1, content : []}
	    					]},
	    						{title : "Kapitel",id: 1, content : []}
	    					]}; 
	    		
	    
	    
		$scope.toolbox = [
			{"title" : "Thema","id": 1, "content" : []},
			{"title" : "Kapitel" , "content" : []},
			{"title" : "Unterkapitel" },
			{"title" : "Text" },
			{"title" : "Frage" },
			];
		
		$scope.deactivateDrop = function(){
			alert("hallo");
			$scope.lehrplan.dropvalue = "false";
			
			
			alert($scope.lehrplan.dropvalue);
		}
		$scope.countId = function(){
			$scope.toolbox[0].id = $scope.toolbox[0].id + 1 ;
			alert($scope.toolbox[0].id);
			
		}
		
		
// 		$scope.createOnDrop = function () {
			
// 			var exam = createExamElement(profile, {"name":"Exam-Name","authorName":null,"authorSurname":null,"date":null});
// 			document.getElementById("Klausur").appendChild(exam);
			
// 		};
		$scope.createInExplorer = function() {
			
		}
	});
	
	app.directive("divPointer",function(){
		return {
		    templateUrl: function(elem, attr) {
		      	if(attr.type == "Thema"){
		      		return "Thema-Div.html"
		      	}else{
		      		return "Thema-Div.html"
		      	}
		    	
		    }
		};
	});
	
	app.directive("divPointerH",function(){
		return {
		    templateUrl: function(elem, attr) {
		      	if(attr.type == "Kapitel"){
		      		return "Kapitel-Div.html"
		      	}else{
		      		return "Kapitel-Div.html"
		      	}
		    	
		    }
		};
	});
	
// 	app.filter("div",function(){
// 			return function(){
// 				return LectureDiv;
// 			};
// 		});
