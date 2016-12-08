/**
 * Provides functionality of the html page
 */

var profile = {"name":"Max","surname":"Mustermann","password":"teacher","userType":"teacher","right":"write"};
//var profile = {"name":"Hanz","surname":"Heinhart","password":"student","userType":"student","right":"read"};

var domElement = createSchoolmaterialElement(profile, "Schoolmaterial");
var jsonObject;

window.onload = function(){
	document.getElementById("dataStructure_DOM").appendChild(domElement);
	tinymce.init({"selector":"textarea"});
}

function convertToDom(){
	
	var jsonString = document.getElementsByTagName("textarea")[0].value;
	jsonObject = JSON.parse(jsonString);
	
	domElement = jsonToDom(profile, jsonObject);
	
	var domStructureContainer = document.getElementById("dataStructure_DOM");
	while(domStructureContainer.firstChild){
		domStructureContainer.removeChild(domStructureContainer.firstChild);
	}
	domStructureContainer.appendChild(domElement);
}

function convertToJson(){
	
	jsonObject = domToJson(profile,domElement);
	
	var jsonTextArea = document.getElementsByTagName("textarea")[0];
	var jsonTextNode = document.createTextNode(JSON.stringify(jsonObject));
	
	/*while(jsonTextArea.firstChild){
		jsonTextArea.removeChild(jsonTextArea.firstChild);
	}*/
	//jsonTextArea.appendChild(jsonTextNode);
	jsonTextArea.value = JSON.stringify(jsonObject);
}

/**
 * ########################################################################
 * Exam
 * @param chapterElement
 */
function insertExamElement(schoolmaterialElement){
	
	var contentElement = schoolmaterialElement.childNodes[1];
	contentElement.appendChild(createExamElement(profile, {"name":"Exam-Name","authorName":null,"authorSurname":null,"date":null}));
}

function removeExamElement(examElement){
	
	var schoolmaterialContentElement = examElement.parentNode;
	schoolmaterialContentElement.removeChild(examElement);
}

/**
 * ########################################################################
 * Topic
 * @param chapterElement
 */
function insertTopicElement(examElement){
	
	var lectureContentElement = examElement.childNodes[1];
	lectureContentElement.appendChild(createTopicElement(profile, "Topic-Name"));
}

function removeTopicElement(topicElement){
	
	var lectureContentElement = topicElement.parentNode;
	lectureContentElement.removeChild(topicElement);
}

/**
 * ########################################################################
 * Chapter
 * @param chapterElement
 */
function insertChapterElement(element){
	
	var contentElement = element.childNodes[1];
	contentElement.appendChild(createChapterElement(profile, "Chapter-Name"));
}

function removeChapterElement(chapterElement){
	
	var parentElement = chapterElement.parentNode;
	parentElement.removeChild(chapterElement);
}

/**
 * ########################################################################
 * Formatting Container
 */

function insertFormattingContainerElement(element){
	
	var contentElement = element.childNodes[1];
	contentElement.appendChild(createFormattingContainerElement(profile, new FormattingContainer()));
}

function removeFormattingContainerElement(formattingContainerElement){
	
	var parentElement = formattingContainerElement.parentNode;
	parentElement.removeChild(formattingContainerElement);
}

/**
 * ########################################################################
 * Other
 */
function fillOutputContainer(){
	//var text = '{"name":"The Hello World Example","author":"Tom","date":"2017","content":[], "addElement":"function(element){this.content.push(element);}"}'
	var container = document.getElementById("outputContainer");
	
	// Erzeugen eines Objekts mit new
	var chapter = new Chapter("Introduction","Olaf","2017");
	chapter.name = "2. Algebra";
	chapter.content.push({"type":"formattingContainer"});
	
	
	
	// JSON-String in Javascript-Objekt umwandeln
	var text = '{"name":"The Hello World Example","author":"Tom","date":"2017","content":[]}';
	//var chapter = JSON.parse(text);
	
	
	
	// JSON-Objekt in JSON-String umwandeln  || Funktionen werden nicht übernommen.
	container.appendChild(document.createTextNode(JSON.stringify(chapter)));
	
	
	container.appendChild(getViewOfObject(chapter));
}

//Loop over all Properties of an JSON-Object
function getViewOfObject(object){
	
	var containerElement = document.createElement("div");
	var tableElement = document.createElement("table");
	
	for(property in object){ // for each
		if(object.hasOwnProperty(property)){ // object has given key? true false
			var row = document.createElement("tr");
			var columnKey = document.createElement("td");
			columnKey.style.width = "77px";
			var columnValue = document.createElement("td");
			columnValue.style.width = "77px";
			
			columnKey.appendChild(document.createTextNode(property)); // key
			columnValue.appendChild(document.createTextNode(object[property])); // value of given key
			
			row.appendChild(columnKey);
			row.appendChild(columnValue);
			
			tableElement.appendChild(row);
		}
	}
	
	return containerElement.appendChild(tableElement);
}