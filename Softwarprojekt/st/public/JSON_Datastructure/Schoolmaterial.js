/**
 * Represents the data structure of 'schoolmaterial'
 * 
 * possible layout elements:
 * 
 * 		- caption
 * 		- sub-caption ...
 * 		- chapter
 * 		- sub-chapter ...
 * 		- list (circle, square, number)
 * 		- table
 * 		- formatting-element (like div)
 * 		- horizontal rule
 * 		- link
 * 		- picture
 * 		- video
 * 		- formula
 * 
 * 
 * Objects haven't some functionality, cause of JSON-String.
 * But it is possible to transfer the data of the parsed JSON-Object
 * to a new Object of the wanted type, for instance 'new Chapter(...)'.
 */

// Prototype  || Constructor
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
	//this.name = name;
	
	this.color = "#000000";
	this.backgroundColor = "#ffffff";
	this.fontWeight = "normal";
	this.fontSize = "12px";
	this.fontFamily = "Arial";
	this.width = "500px";
	this.height = "200px";
	this.position = "none";
	
	this.content = [];
}

function Link(){
	
	this.type = "link";
	this.reference = null;
	this.content = [];
}