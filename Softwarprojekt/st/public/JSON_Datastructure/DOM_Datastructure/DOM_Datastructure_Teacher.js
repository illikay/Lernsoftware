/**
 * Teacher - DOM-Structure:
 * 
 * Provides methods for
 * 	-> converting
 * 			- HTML-Structure to JSON-Objects
 * 			- JSON-Objects to HTML-Structure
 * 
 * 	-> creating single Element-Types
 */

function jsonToDom(object){
	
	var element = null;
	
	switch(object.type){
		case "schoolmaterial" : element = dom_getSchoolmaterialElement(object); break;
		case "exam" : element = dom_getLectureElement(object); break;
		case "topic" : element = dom_getTopicElement(object); break;
		case "chapter" : element = dom_getChapterElement(object); break;
		case "formattingContainer" : element = dom_getFormattingContainerElement(object); break;
		case "link" : element = dom_getLinkElement(object); break;
	}
	
	return element;
}

function domToJson(element){
	
	var object = null;
	
	switch(element.getAttribute("class")){
		case "schoolmaterial" : object = json_getSchoolmaterialObject(element); break;
		case "exam" : object = json_getExamObject(element); break;
		case "topic" : object = json_getTopicObject(element); break;
		case "chapter" : object = json_getChapterObject(element); break;
		case "formattingContainer" : object = json_getFormattingContainerObject(element); break;
		case "link" : object = json_getLinkObject(element); break;
	}
	
	return object;
}

/**
 * #######################################################################
 * Schoolmaterial
 */

function createSchoolmaterialElement(schoolmaterialName){
	
	var schoolmaterialElement = document.createElement("div");
	schoolmaterialElement.setAttribute("class","schoolmaterial");
	
	// schoolmaterial head
	var nameFieldElement = document.createElement("div");
	
	nameFieldElement.appendChild(document.createTextNode(schoolmaterialName));
	nameFieldElement.appendChild(getInputElement({"type":"button","value":"create Exam","onclick":"insertExamElement(this.parentNode.parentNode)"}));
	
	schoolmaterialElement.appendChild(nameFieldElement);
	
	// schoolmaterial content
	var contentElement = document.createElement("div");
	schoolmaterialElement.appendChild(contentElement);
	
	return schoolmaterialElement;
}

function dom_getSchoolmaterialElement(object){
	
	var schoolmaterialElement = createSchoolmaterialElement(object.name);
	
	var contentElement = schoolmaterialElement.childNodes[1];
	var childObjects = object.content;
	for(var i = 0; i < childObjects.length; i++){
		contentElement.appendChild(dom_getExamElement(childObjects[i]));
	}
	
	return schoolmaterialElement;
}

function json_getSchoolmaterialObject(element){
	
	var schoolmaterialObject = new Schoolmaterial(element.childNodes[0].childNodes[0].nodeValue);
	
	var childElements = element.childNodes[1].childNodes;
	for(var i = 0; i < childElements.length; i++){
		schoolmaterialObject.content.push(json_getExamObject(childElements[i]));
	}
	
	return schoolmaterialObject;
}

/**
 * #######################################################################
 * Exam
 */

function createExamElement(attributeValues){
	
	var examElement = document.createElement("div");
	examElement.setAttribute("class","exam");
	
	// lecture head
	var examHeaderElement = document.createElement("div");
	
	// lecture attribute elements ###############################################################################
	
	// name
	examHeaderElement.appendChild(getAttributeContainerElement({"className":"examName","name":"Exam-Name: ","value":getInputElement({"type":"text","value":attributeValues.name || "Exam-Name","width":"100px"})}));
	
	// lecture notifier
	examHeaderElement.appendChild(getAttributeContainerElement({"className":"examLectureNotifier","name":"Lecture: ","value":getInputElement({"type":"text","value":attributeValues.lecture || "Lecture","width":"100px"})}));
	
	// class name
	examHeaderElement.appendChild(getAttributeContainerElement({"className":"examClassName","name":"Class: ","value":getInputElement({"type":"text","value":attributeValues.className || "Class","width":"100px"})}));
	
	// author
	examHeaderElement.appendChild(getAttributeContainerElement({"className":"examAuthorName","name":"Author-Name: ","value":getInputElement({"type":"text","value":attributeValues.author || "Author-Name"})}));
	
	// last change
	examHeaderElement.appendChild(getAttributeContainerElement({"className":"lastChange","name":"Date: ","value":document.createTextNode(attributeValues.date || new Date().toLocaleDateString())}));
	
	// exam date
	examHeaderElement.appendChild(getAttributeContainerElement({"className":"examDate","name":"Exam-Date: ","value":getInputElement({"type":"text","value":attributeValues.examDate || ""})}));
	
	// create Topic
	examHeaderElement.appendChild(getAttributeContainerElement({"value":getInputElement({"type":"button","value":"create Topic","onclick":"insertTopicElement(this.parentNode.parentNode.parentNode)"})}));
	
	// checkbox
	examHeaderElement.appendChild(getAttributeContainerElement({"name":"Visibility: ","value":getInputElement({"type":"checkbox","onchange":"changeChildElementVisibility(this)"})}));
	
	// delete Exam
	examHeaderElement.appendChild(getAttributeContainerElement({"value":getInputElement({"type":"button","value":"X","onclick":"removeExamElement(this.parentNode.parentNode.parentNode)"})}));
	
	examElement.appendChild(examHeaderElement);
	
	
	// lecture content #################################################################################
	
	var contentElement = document.createElement("div");
	contentElement.setAttribute("data-jqyoui-options","{accept:'.topic'}");
	contentElement.setAttribute("data-drop","true");
	contentElement.setAttribute("jqyoui-droppable","{ondrop:'createOnDrop()'}");
	examElement.appendChild(contentElement);
	
	return examElement;
}



function dom_getExamElement(object){
	
	var examElement = createExamElement(object);
	
	var contentElement = examElement.childNodes[1];
	var childObjects = object.content;
	for(var i = 0; i < childObjects.length; i++){
		contentElement.appendChild(dom_getTopicElement(childObjects[i]));
	}
	// examElement.appendChild(contentElement);
	
	return examElement;
}

function json_getExamObject(element){
	
	var examObject = new Exam();
	
	var examHeaderElements = element.childNodes[0].childNodes;
	
	for(var i = 0; i < examHeaderElements.length; i++){
		var examHeaderElement = examHeaderElements[i];
		var childNodeClass = examHeaderElement.id;
		switch(childNodeClass){
			case "examName" : examObject.name = examHeaderElement.childNodes[1].childNodes[0].value;
			case "examLectureNotifier" : examObject.lecture = examHeaderElement.childNodes[1].childNodes[0].value;
			case "examClassName" : examObject.className = examHeaderElement.childNodes[1].childNodes[0].value;
			case "examAuthorName" : examObject.author = examHeaderElement.childNodes[1].childNodes[0].value;
			case "lastChange" : examObject.lastChange = new Date().toLocaleDateString();
			case "examDate" : examObject.examDate = examHeaderElement.childNodes[1].childNodes[0].value;
		}
	}
	
	var childElements = element.childNodes[1].childNodes;
	for(var i = 0; i < childElements.length; i++){
		examObject.content.push(json_getTopicObject(childElements[i]));
	}
	
	return examObject;
}

function insertExamElement(schoolmaterialElement){
	
	var contentElement = schoolmaterialElement.childNodes[1];
	contentElement.appendChild(createExamElement({}));
}

function removeExamElement(examElement){
	
	var schoolmaterialContentElement = examElement.parentNode;
	schoolmaterialContentElement.removeChild(examElement);
}

function dropAction(examElement,contentElement){
	examElement.childNodes[1].appendChild(contentElement);
}

/**
 * #########################################################################################
 * Topic:
 */

function createTopicElement(topicName){
	
	var topicElement = document.createElement("div");
	topicElement.setAttribute("class","topic");
	
	// topic header
	var topicHeaderElement = document.createElement("div");
	
	// topic attribute elements ###############################################################################
	
	// topic name
	topicHeaderElement.appendChild(getAttributeContainerElement({"className":"topicName","name":"Topic-Name: ","value":getInputElement({"type":"text","value":topicName || "Topic-Name","width":"100px"})}));
	
	// remove topic
	topicHeaderElement.appendChild(getAttributeContainerElement({"value":getInputElement({"type":"button","value":"X","onclick":"removeTopicElement(this.parentNode.parentNode.parentNode)"})}));
	
	topicElement.appendChild(topicHeaderElement);
	
	// topic content #################################################################################
	
	var topicContentElement = document.createElement("div");
	topicContentElement.setAttribute("class","topicContentContainer");
	
	// content part
	var contentPartElement = document.createElement("div");
	contentPartElement.setAttribute("class","topicContentPart");
	
	var contentPartHeader = document.createElement("div");
	contentPartHeader.appendChild(getAttributeContainerElement({"value":document.createTextNode("Content")}));
	contentPartHeader.appendChild(getAttributeContainerElement({"value":getInputElement({"type":"button","value":"create Chapter","onclick":"insertChapterElement(this.parentNode.parentNode.parentNode)"})}));
	contentPartElement.appendChild(contentPartHeader);
	
	var contentPartContent = document.createElement("div");
	contentPartElement.appendChild(contentPartContent);
	
	topicContentElement.appendChild(contentPartElement);
	
	// exercises part
	var exercisesPartElement = document.createElement("div");
	exercisesPartElement.setAttribute("class","topicExercisesPart");
	
	var exercisesPartHeader = document.createElement("div");
	exercisesPartHeader.appendChild(getAttributeContainerElement({"value":document.createTextNode("Exercises")}));
	exercisesPartHeader.appendChild(getAttributeContainerElement({"value":getInputElement({"type":"button","value":"create Chapter","onclick":"insertChapterElement(this.parentNode.parentNode.parentNode)"})}));
	exercisesPartElement.appendChild(exercisesPartHeader);
	
	var exercisesPartContent = document.createElement("div");
	exercisesPartElement.appendChild(exercisesPartContent);
	
	topicContentElement.appendChild(exercisesPartElement);
	
	// solutions part
	var solutionsPartElement = document.createElement("div");
	solutionsPartElement.setAttribute("class","topicSolutionsPart");
	
	var solutionsPartHeader = document.createElement("div");
	solutionsPartHeader.appendChild(getAttributeContainerElement({"value":document.createTextNode("Solutions")}));
	solutionsPartHeader.appendChild(getAttributeContainerElement({"value":getInputElement({"type":"button","value":"create Chapter","onclick":"insertChapterElement(this.parentNode.parentNode.parentNode)"})}));
	solutionsPartElement.appendChild(solutionsPartHeader);
	
	var solutionsPartContent = document.createElement("div");
	solutionsPartElement.appendChild(solutionsPartContent);
	
	topicContentElement.appendChild(solutionsPartElement);
	
	topicElement.appendChild(topicContentElement);
	
	return topicElement;
}

function dom_getTopicElement(object){
	
	var topicElement = createTopicElement(object.name);
	
	var contentContentElement = topicElement.childNodes[1].childNodes[0].childNodes[1];
	var contentChildObjects = object.content;
	for(var i = 0; i < contentChildObjects.length; i++){
		contentContentElement.appendChild(dom_getChapterElement(contentChildObjects[i]));
	}
	
	var exercisesContentElement = topicElement.childNodes[1].childNodes[1].childNodes[1];
	var exercisesChildObjects = object.exercises;
	for(var i = 0; i < exercisesChildObjects.length; i++){
		exercisesContentElement.appendChild(dom_getChapterElement(exercisesChildObjects[i]));
	}
	
	var solutionsContentElement = topicElement.childNodes[1].childNodes[2].childNodes[1];
	var solutionsChildObjects = object.solutions;
	for(var i = 0; i < solutionsChildObjects.length; i++){
		solutionsContentElement.appendChild(dom_getChapterElement(solutionsChildObjects[i]));
	}
	
	return topicElement;
}

function json_getTopicObject(element){
	
	var topicObject = new Topic(topicNameValue = element.childNodes[0].childNodes[0].childNodes[1].childNodes[0].value);
	
	var contentPartChildElements = element.childNodes[1].childNodes[0].childNodes[1].childNodes;
	for(var i = 0; i < contentPartChildElements.length; i++){
		topicObject.content.push(json_getChapterObject(contentPartChildElements[i]));
	}
	
	var exercisesPartChildElements = element.childNodes[1].childNodes[1].childNodes[1].childNodes;
	for(var i = 0; i < exercisesPartChildElements.length; i++){
		topicObject.exercises.push(json_getChapterObject(exercisesPartChildElements[i]));
	}
	
	var solutionsPartChildElements = element.childNodes[1].childNodes[2].childNodes[1].childNodes;
	for(var i = 0; i < solutionsPartChildElements.length; i++){
		topicObject.solutions.push(json_getChapterObject(solutionsPartChildElements[i]));
	}
	
	return topicObject;
}

function insertTopicElement(examElement){
	
	var lectureContentElement = examElement.childNodes[1];
	lectureContentElement.appendChild(createTopicElement());
}

function removeTopicElement(topicElement){
	
	var lectureContentElement = topicElement.parentNode;
	lectureContentElement.removeChild(topicElement);
}

/**
 * #########################################################################################
 * Chapter:
 * 
 * @param object
 * @returns
 */
function createChapterElement(attributeValues){
	
	var chapterElement = document.createElement("div");
	chapterElement.setAttribute("class","chapter");
	
	var chapterHeaderElement = document.createElement("div");
	
	// chapter attribute elements ###############################################################################
	
	// chapter name
	chapterHeaderElement.appendChild(getAttributeContainerElement({"className":"chapterName","name":"Chapter-Name: ","value":getInputElement({"type":"text","value":attributeValues.name || "Chapter-Name","width":"100px"})}));
	
	// exam name
	chapterHeaderElement.appendChild(getAttributeContainerElement({"className":"chapterExamName","name":"Exam-Name: ","value":document.createTextNode(attributeValues.exam || "Exam-Name")}));
	
	// work time
	chapterHeaderElement.appendChild(getAttributeContainerElement({"className":"chapterWorkTime","name":"Work-Time: ","value":getInputElement({"type":"text","value":attributeValues.workTime || "Work-Time"})}));
	
	// create sub-chapter
	chapterHeaderElement.appendChild(getAttributeContainerElement({"value":getInputElement({"type":"button","value":"create Sub-Chapter","onclick":"insertChapterElement(this.parentNode.parentNode.parentNode)"})}));
	
	// create formatting-container
	chapterHeaderElement.appendChild(getAttributeContainerElement({"value":getInputElement({"type":"button","value":"create Formatting Container","onclick":"insertFormattingContainerElement(this.parentNode.parentNode.parentNode)"})}));
	
	// remove chapter
	chapterHeaderElement.appendChild(getAttributeContainerElement({"value":getInputElement({"type":"button","value":"X","onclick":"removeChapterElement(this.parentNode.parentNode.parentNode)"})}));
	
	// upload files
	chapterHeaderElement.appendChild(getAttributeContainerElement({"value":getInputElement({"type":"file","value":"upload file","onchange":"uploadFile(this)","multiple":true})}));
	
	chapterElement.appendChild(chapterHeaderElement);
	
	// chapter content #################################################################################
	
	var chapterContentElement = document.createElement("div");
	chapterElement.appendChild(chapterContentElement);
	
	return chapterElement;
}

function dom_getChapterElement(object){
	
	var chapterElement = createChapterElement(object);
	
	// chapter body|content
	var contentElement = chapterElement.childNodes[1];
	var childObjects = object.content;
	for(var i = 0; i < childObjects.length; i++){
		var childElement;
		if(childObjects[i].type === "chapter"){
			childElement = dom_getChapterElement(childObjects[i]);
		}else{
			childElement = dom_getFormattingContainerElement(childObjects[i]);
		}
		contentElement.appendChild(childElement);
	}
	chapterElement.appendChild(contentElement);
	
	return chapterElement;
}

function json_getChapterObject(element){
	
	var chapterObject = new Chapter();
	
	// element.childNodes[0].childNodes[0].value
	
	var chapterHeaderElements = element.childNodes[0].childNodes;
	
	for(var i = 0; i < chapterHeaderElements.length; i++){
		var chapterHeaderElement = chapterHeaderElements[i];
		var childNodeClass = chapterHeaderElement.id;
		switch(childNodeClass){
			case "chapterName" : chapterObject.name = chapterHeaderElement.childNodes[1].childNodes[0].value;
			case "chapterExamName" : chapterObject.lecture = chapterHeaderElement.childNodes[1].childNodes[0].value;
			case "chapterWorkTime" : chapterObject.className = chapterHeaderElement.childNodes[1].childNodes[0].value;
		}
	}
	
	var childElements = element.childNodes[1].childNodes;
	for(var i = 0; i < childElements.length; i++){
		var childObject;
		if(childElements[i].getAttribute("class") === "chapter"){
			childObject = json_getChapterObject(childElements[i]);
		}else{
			childObject = json_getFormattingContainerObject(childElements[i]);
		}
		chapterObject.content.push(childObject);
	}
	
	return chapterObject;
}

function insertChapterElement(element){
	
	var contentElement = element.childNodes[1];
	contentElement.appendChild(createChapterElement({}));
}

function removeChapterElement(chapterElement){
	
	var parentElement = chapterElement.parentNode;
	parentElement.removeChild(chapterElement);
}


/**
 * #########################################################################################
 * Formatting-Container:
 */
var idValue = 1;

function createFormattingContainerElement(properties){
	
	var id = idValue++;
	
	var formattingContainerElement = document.createElement("div");
	formattingContainerElement.setAttribute("class","formattingContainer");
	
	// head
	var containerHead = document.createElement("div");
	containerHead.appendChild(getAttributeContainerElement({"value":getInputElement({"type":"button","value":"to edit","onclick":"createEditableTextArea({'viewId':'formattingContainerView_" + id + "','editorId':'editableTextArea_" + id + "','callbackCreate':" + properties.callbackCreate + ",'callbackSave':" + (properties.callbackSave || function(){}) + "})"})}));
	containerHead.appendChild(getAttributeContainerElement({"value":getInputElement({"type":"button","value":"X","onclick":"removeFormattingContainerElement(this.parentNode.parentNode.parentNode)"})}));
	formattingContainerElement.appendChild(containerHead);
	
	// content
	var containerContent = document.createElement("div");
	containerContent.setAttribute("id","formattingContainerView_" + id);
	containerContent.innerHTML = properties.content || "";
	formattingContainerElement.appendChild(containerContent);
	
	return formattingContainerElement;
}

function dom_getFormattingContainerElement(object){
	
	return createFormattingContainerElement({
		"content":object.content
		,"callbackCreate":callbackCreate
		,"callbackSave":callbackSave
		});
}

function json_getFormattingContainerObject(element){
	
	var formattingContainerObject = new FormattingContainer();
	
	formattingContainerObject.content = element.childNodes[1].innerHTML;
	
	return formattingContainerObject;
}

function insertFormattingContainerElement(element){
	
	var contentElement = element.childNodes[1];
	contentElement.appendChild(createFormattingContainerElement({"callbackCreate":callbackCreate,"callbackSave":callbackSave}));
}

function removeFormattingContainerElement(formattingContainerElement){
	
	var parentElement = formattingContainerElement.parentNode;
	parentElement.removeChild(formattingContainerElement);
}


function callbackCreate(editableTextAreaElement){
	
	var containerElement = document.getElementById("container");
	containerElement.style.opacity = 0.03;
	
	var editorContainerElement = document.createElement("div");
	editorContainerElement.setAttribute("id","editorContainer");
	editorContainerElement.appendChild(editableTextAreaElement);
	document.body.appendChild(editorContainerElement);
}

function callbackSave(){
	
	var containerElement = document.getElementById("container");
	containerElement.style.opacity = 1;
	
	document.body.removeChild(document.getElementById("editorContainer"));
}

/**
 * ##########################################################################################
 * Link:
 * 
 * @param object
 * @returns
 */
function createLinkElement(linkName){
	
	
}

function dom_getLinkElement(object){
	
	// link with reference
	var aElement = document.createElement("a");
	aElement.setAttribute("href",object.reference);
	
	// link content
	var childObjects = object.content;
	for(var i = 0; i < childObjects.length; i++){
		aElement.appendChild(dom_getFormattingContainerElement(childObjects[i]));
	}
	
	return aElement;
}

function json_getLinkObject(element){
	
	// link object
	var link = new Link();
	link.reference = element.getAttribute("href");
	
	// link content
	var childElements = element.childNodes;
	for(var i = 0; i < childObjects.length; i++){
		link.content.push(json_getFormattingContainerObject(childElements[i]));
	}
	
	return link;
}