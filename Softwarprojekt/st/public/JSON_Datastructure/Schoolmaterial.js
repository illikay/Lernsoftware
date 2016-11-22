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
function Schoolmaterial(){
	
	this.type = "schoolmaterial";
	this.content = [];
}

function Lecture(name){
	
	this.type = "lecture";
	this.name = name;
	this.content = [];
}

function Topic(name){
	
	this.type = "topic";
	this.name = name;
	
	this.content = [];
	this.exercises = [];
	this.solutions = [];
}

function Chapter(name){
	
	this.type = "chapter";
	this.name = name;
	this.author = null;
	this.date = null;
	this.id = null;
	this.content = [];
}

function FormattingContainer(name){
	
	this.type = "formattingContainer";
	this.name = name;
	
	this.color = "#000000";
	this.backgroundColor = "#ffffff";
	this.fontWeight = "default";
	this.fontSize = "12px";
	this.fontStyle = "arial";
	this.width = null;
	this.height = null;
	this.position = "none";
	
	this.content = [];
}

function Link(){
	
	this.type = "link";
	this.reference = null;
	this.content = [];
}


// Erzeugen eines JS-Objekts ohne Konstruktor
function createChapter(name,author,date,content){
	
	return {
		 "type":"chapter"
		,"name":name
		,"author":author
		,"date":date
		,"content":content
		
		,"setName":function(name){this.name = name;}
		,"getName":function(){return name;}
	}
}