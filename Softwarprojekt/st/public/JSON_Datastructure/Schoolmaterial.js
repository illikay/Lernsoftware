/**
 * Represents the JSON data structure:
 * 
 * - Factory for creating different object types.
 * 
 * Objects haven't some functionality, cause of JSON-String.
 * But it is possible to transfer the data of the parsed JSON-Object
 * to a new Object of the wanted type, for instance 'new Chapter(...)'.
 */

// Prototype  || Constructor

var jsonObjectFactory = function(){
	
	function Schoolmaterial(name){
		
		this.type = "schoolmaterial";
		this.name = name;
		this.content = [];
	}

	function Exam(){
		
		this.type = "exam";
		this.id = -1;
		this.name = "";
		this.lecture = "";
		this.className = "";
		this.author = "";
		this.lastChange = null;
		this.examDate = null;
		this.content = [];
	}

	function Topic(name){
		
		this.type = "topic";
		this.id = -1;
		this.name = name;
		this.content = [];
		this.exercises = [];
		this.solutions = [];
	}

	function Exercise(){
		
		this.type = "exercise";
		this.name = "";
		this.question = [];
		this.solution = [];
	}
	
	function Chapter(){
		
		this.type = "chapter";
		this.id = -1;
		this.name = "";
		this.exam = "";
		this.workTime = "";
		this.content = [];
	}

	function FormattingContainer(){
		
		this.type = "formattingContainer";
		this.id = -1;
		
		this.content = "";
	}

	function Link(){
		
		this.type = "link";
		this.reference = null;
		this.content = [];
	}
	
	function createJsonObject(objectName,constructorArguments){
		
		var object = null;
		
		switch(objectName){
			case "schoolmaterial" : object = new Schoolmaterial(constructorArguments); break;
			case "exam" : object = new Exam(); break;
			case "topic" : object = new Topic(constructorArguments); break;
			case "exercise" : object = new Exercise(constructorArguments); break;
			case "chapter" : object = new Chapter(); break;
			case "formattingContainer" : object = new FormattingContainer(); break;
			case "link" : object = new Link(); break;
		}
		
		return object;
	}
	
	return {
		"create":createJsonObject
	};
}();