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
	
	var element;
	
	if(object.type === "schoolmaterial"){
		element = dom_getSchoolmaterialElement(object);
	}else if(object.type === "exam"){
		element = dom_getLectureElement(object);
	}else if(object.type === "topic"){
		element = dom_getTopicElement(object);
	}else if(object.type === "chapter"){
		element = dom_getChapterElement(object);
	}else if(object.type === "formattingContainer"){
		element = dom_getFormattingContainerElement(object);
	}else if(object.type === "link"){
		element = dom_getLinkElement(object);
	}
	
	return element;
}

function domToJson(element){
	
	var object;
	
	var classValue = element.getAttribute("class");
	if(classValue === "schoolmaterial"){
		object = json_getSchoolmaterialObject(element);
	}else if(classValue === "exam"){
		object = json_getExamObject(element);
	}else if(classValue === "topic"){
		object = json_getTopicObject(element);
	}else if(classValue === "chapter"){
		object = json_getChapterObject(element);
	}else if(classValue === "formattingContainer"){
		object = json_getFormattingContainerObject(element);
	}else if(classValue === "link"){
		object = json_getLinkObject(element);
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
		contentElement.appendChild(dom_getExamElement(profile, childObjects[i]));
	}
	
	return schoolmaterialElement;
}

function json_getSchoolmaterialObject(element){
	
	var schoolmaterialObject = new Schoolmaterial(element.childNodes[0].childNodes[0].nodeValue);
	
	var childElements = element.childNodes[1].childNodes;
	for(var i = 0; i < childElements.length; i++){
		schoolmaterialObject.content.push(json_getExamObject(profile,childElements[i]));
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
	var examNameField = document.createElement("span");
	examNameField.setAttribute("class","examName");
	
	var examNameFieldName = document.createElement("span");
	examNameFieldName.appendChild(document.createTextNode("Exam-Name: "));
	examNameField.appendChild(examNameFieldName);
	
	var examNameFieldValue = document.createElement("span");
	examNameFieldValue.appendChild(getInputElement({"type":"text","value":attributeValues.name || "Exam-Name","width":"100px"}));
	examNameField.appendChild(examNameFieldValue);
	
	examHeaderElement.appendChild(examNameField);
	
	// lecture notifier
	var lectureNotifierField = document.createElement("span");
	lectureNotifierField.setAttribute("class","examLectureNotifier");
	
	var lectureNotifierFieldName = document.createElement("span");
	lectureNotifierFieldName.appendChild(document.createTextNode("Lecture: "));
	lectureNotifierField.appendChild(lectureNotifierFieldName);
	
	var lectureNotifierFieldValue = document.createElement("span");
	lectureNotifierFieldValue.appendChild(getInputElement({"type":"text","value":attributeValues.lecture || "Lecture","width":"100px"}));
	lectureNotifierField.appendChild(lectureNotifierFieldValue);
	
	examHeaderElement.appendChild(lectureNotifierField);
	
	// class name
	var classNameField = document.createElement("span");
	classNameField.setAttribute("class","examClassName");
	
	var classNameFieldName = document.createElement("span");
	classNameFieldName.appendChild(document.createTextNode("Class: "));
	classNameField.appendChild(classNameFieldName);
	
	var classNameFieldValue = document.createElement("span");
	classNameFieldValue.appendChild(getInputElement({"type":"text","value":attributeValues.className || "Class","width":"100px"}));
	classNameField.appendChild(classNameFieldValue);
	
	examHeaderElement.appendChild(classNameField);
	
	// author
	var authorNameField = document.createElement("span");
	authorNameField.setAttribute("class","examAuthorName");
	
	var authorNameFieldName = document.createElement("span");
	authorNameFieldName.appendChild(document.createTextNode("Author-Name: "));
	authorNameField.appendChild(authorNameFieldName);
	
	var authorNameFieldValue = document.createElement("span");
	authorNameFieldValue.appendChild(getInputElement({"type":"text","value":attributeValues.author || "Author-Name"}));
	authorNameField.appendChild(authorNameFieldValue);
	
	examHeaderElement.appendChild(authorNameField);
	
	// last change
	var lastChangeField = document.createElement("span");
	lastChangeField.setAttribute("class","lastChange");
	
	var lastChangeFieldName = document.createElement("span");
	lastChangeFieldName.appendChild(document.createTextNode("Date: "));
	lastChangeField.appendChild(lastChangeFieldName);
	
	var lastChangeFieldValue = document.createElement("span");
	lastChangeFieldValue.appendChild(document.createTextNode(attributeValues.date || new Date().toLocaleDateString()));
	lastChangeField.appendChild(lastChangeFieldValue);
	
	examHeaderElement.appendChild(lastChangeField);
	
	// exam date
	var examDateField = document.createElement("span");
	examDateField.setAttribute("class","examDate");
	
	var examDateFieldName = document.createElement("span");
	examDateFieldName.appendChild(document.createTextNode("Exam-Date: "));
	examDateField.appendChild(examDateFieldName);
	
	var examDateFieldValue = document.createElement("span");
	examDateFieldValue.appendChild(getInputElement({"type":"text","value":attributeValues.examDate || ""}));
	examDateField.appendChild(examDateFieldValue);
	
	examHeaderElement.appendChild(examDateField);
	
	// create Topic
	var createTopicField = document.createElement("span");
	createTopicField.appendChild(getInputElement({"type":"button","value":"create Topic","onclick":"insertTopicElement(this.parentNode.parentNode)"}));
	
	examHeaderElement.appendChild(createTopicField);
	
	// checkbox
	var visibilityCheckerField = document.createElement("span");
	
	var visibilityCheckerFieldName = document.createElement("span");
	visibilityCheckerFieldName.appendChild(document.createTextNode("Visibility: "));
	visibilityCheckerField.appendChild(visibilityCheckerFieldName);
	
	var visibilityCheckerFieldValue = document.createElement("span");
	visibilityCheckerFieldValue.appendChild(getInputElement({"type":"checkbox","onchange":"changeChildElementVisibility(this)"}));
	visibilityCheckerField.appendChild(visibilityCheckerFieldValue);
	
	examHeaderElement.appendChild(visibilityCheckerField);
	
	// delete Exam
	var removeExamField = document.createElement("span");
	removeExamField.appendChild(getInputElement({"type":"button","value":"X","onclick":"removeExamElement(this.parentNode.parentNode)"}));
	
	examHeaderElement.appendChild(removeExamField);
	
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
	var topicNameField = document.createElement("span");
	topicNameField.setAttribute("class","topicName");
	
	var topicNameFieldName = document.createElement("span");
	topicNameFieldName.appendChild(document.createTextNode("Topic-Name: "));
	topicNameField.appendChild(topicNameFieldName);
	
	var topicNameFieldValue = document.createElement("span");
	topicNameFieldValue.appendChild(getInputElement({"type":"text","value":topicName || "Topic-Name","width":"100px"}));
	topicNameField.appendChild(topicNameFieldValue);
	
	topicHeaderElement.appendChild(topicNameField);
	
	// remove topic
	var removeTopicField = document.createElement("span");
	removeTopicField.appendChild(getInputElement({"type":"button","value":"X","onclick":"removeTopicElement(this.parentNode.parentNode)"}));
	
	topicHeaderElement.appendChild(removeTopicField);
	
	topicElement.appendChild(topicHeaderElement);
	
	
	// topic content #################################################################################
	
	var topicContentElement = document.createElement("div");
	topicContentElement.setAttribute("class","topicContentContainer");
	
	// content part
	var contentPartElement = document.createElement("div");
	contentPartElement.setAttribute("class","topicContentPart");
	
	var contentPartHeader = document.createElement("div");
	
	var contentPartNameField = document.createElement("span");
	contentPartNameField.appendChild(document.createTextNode("Content"));
	contentPartHeader.appendChild(contentPartNameField);
	
	var contentPartCreateChapterField = document.createElement("span");
	contentPartCreateChapterField.appendChild(getInputElement({"type":"button","value":"create Chapter","onclick":"insertChapterElement(this.parentNode.parentNode)"}));
	contentPartHeader.appendChild(contentPartCreateChapterField);
	
	contentPartElement.appendChild(contentPartHeader);
	
	var contentPartContent = document.createElement("div");
	contentPartElement.appendChild(contentPartContent);
	
	topicContentElement.appendChild(contentPartElement);
	
	// exercises part
	var exercisesPartElement = document.createElement("div");
	exercisesPartElement.setAttribute("class","topicExercises");
	
	var exercisesPartHeader = document.createElement("div");
	
	var exercisesPartNameField = document.createElement("span");
	exercisesPartNameField.appendChild(document.createTextNode("Exercises"));
	exercisesPartHeader.appendChild(exercisesPartNameField);
	
	var exercisesPartCreateChapterField = document.createElement("span");
	exercisesPartCreateChapterField.appendChild(getInputElement({"type":"button","value":"create Chapter","onclick":"insertChapterElement(this.parentNode.parentNode)"}));
	exercisesPartHeader.appendChild(exercisesPartCreateChapterField);
	
	exercisesPartElement.appendChild(exercisesPartHeader);
	
	var exercisesPartContent = document.createElement("div");
	exercisesPartElement.appendChild(exercisesPartContent);
	
	topicContentElement.appendChild(exercisesPartElement);
	
	// solutions part
	var solutionsPartElement = document.createElement("div");
	solutionsPartElement.setAttribute("class","topicSolutions");
	
	var solutionsPartHeader = document.createElement("div");
	
	var solutionsPartNameField = document.createElement("span");
	solutionsPartNameField.appendChild(document.createTextNode("Solutions"));
	solutionsPartHeader.appendChild(solutionsPartNameField);
	
	var solutionsPartCreateChapterField = document.createElement("span");
	solutionsPartCreateChapterField.appendChild(getInputElement({"type":"button","value":"create Chapter","onclick":"insertChapterElement(this.parentNode.parentNode)"}));
	solutionsPartHeader.appendChild(solutionsPartCreateChapterField);
	
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
	/*var chapterNameField = document.createElement("span");
	chapterNameField.setAttribute("id","chapterName");
	
	var chapterNameFieldName = document.createElement("span");
	chapterNameFieldName.appendChild(document.createTextNode("Chapter-Name: "));
	chapterNameField.appendChild(chapterNameFieldName);
	
	var chapterNameFieldValue = document.createElement("span");
	chapterNameFieldValue.appendChild(getInputElement({"type":"text","value":chapterName || "Chapter-Name","width":"100px"}));
	chapterNameField.appendChild(chapterNameFieldValue);*/
	
	chapterHeaderElement.appendChild(getContainerElement_Span({"className":"chapterName","name":"Chapter-Name: ","value":getInputElement({"type":"text","value":attributeValues.name || "Chapter-Name","width":"100px"})}));
	
	// exam name
	chapterHeaderElement.appendChild(getContainerElement_Span({"className":"chapterExamName","name":"Exam-Name: ","value":document.createTextNode(attributeValues.exam || "Exam-Name")}));
	
	// work time
	chapterHeaderElement.appendChild(getContainerElement_Span({"className":"chapterWorkTime","name":"Work-Time: ","value":getInputElement({"type":"text","value":attributeValues.workTime || "Work-Time"})}));
	
	// create sub-chapter
	/*var chapterCreateChapterField = document.createElement("span");
	chapterCreateChapterField.appendChild(getInputElement({"type":"button","value":"create Sub-Chapter","onclick":"insertChapterElement(this.parentNode.parentNode)"}));*/
	
	chapterHeaderElement.appendChild(getContainerElement_Span({"value":getInputElement({"type":"button","value":"create Sub-Chapter","onclick":"insertChapterElement(this.parentNode.parentNode)"})}));
	
	// create formatting-container
	/*var chapterCreateFormattingContainerField = document.createElement("span");
	chapterCreateFormattingContainerField.appendChild(getInputElement({"type":"button","value":"create Formatting Container","onclick":"insertFormattingContainerElement(this.parentNode.parentNode)"}));*/
	
	chapterHeaderElement.appendChild(getContainerElement_Span({"value":getInputElement({"type":"button","value":"create Formatting Container","onclick":"insertFormattingContainerElement(this.parentNode.parentNode)"})}));
	
	// remove chapter
	/*var chapterRemoveChapterField = document.createElement("span");
	chapterRemoveChapterField.appendChild(getInputElement({"type":"button","value":"X","onclick":"removeChapterElement(this.parentNode.parentNode)"}));*/
	
	chapterHeaderElement.appendChild(getContainerElement_Span({"value":getInputElement({"type":"button","value":"X","onclick":"removeChapterElement(this.parentNode.parentNode)"})}));
	
	// upload files
	/*var chapterUploadFilesField = document.createElement("span");
	chapterUploadFilesField.appendChild(getInputElement({"type":"file","value":"upload file","onchange":"uploadFile(this)","multiple":true}));*/
	
	chapterHeaderElement.appendChild(getContainerElement_Span({"value":getInputElement({"type":"file","value":"upload file","onchange":"uploadFile(this)","multiple":true})}));
	
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


/**
 * #########################################################################################
 * Formatting-Container:
 */
function createFormattingContainerElement(idValue){
	
	var id = idValue || "GCEbdAf";
	
	var formattingContainerElement = document.createElement("div");
	formattingContainerElement.setAttribute("class","formattingContainer");
	
	// head
	var containerHead = document.createElement("div");
	containerHead.appendChild(getContainerElement_Span({"value":getInputElement({"type":"button","value":"to edit","onclick":"createEditableTextArea('formattingContainerView_" + id + "','editableTextArea_" + id + "')"})}));
	containerHead.appendChild(getContainerElement_Span({"value":getInputElement({"type":"button","value":"X","onclick":"removeFormattingContainerElement(this.parentNode.parentNode.parentNode)"})}));
	formattingContainerElement.appendChild(containerHead);
	
	// content
	var containerContent = document.createElement("div");
	containerContent.setAttribute("id","formattingContainerView_" + id);
	formattingContainerElement.appendChild(containerContent);
	
	return formattingContainerElement;
}

function dom_getFormattingContainerElement(object){
	
	var formattingContainerElement = createFormattingContainerElement(object);
	
	var textAreaElement = formattingContainerElement.childNodes[0];
	textAreaElement.value = object.content[0];
	
	//var contentElement = formattingContainerElement.childNodes[1];
	/*var childObjects = object.content;
	for(var i = 0; i < childObjects.length; i++){
		var childElement;
		if(typeof childObjects[i] === "string"){
			childElement = document.createTextNode(childObjects[i]);
		}else if(childObjects.type === "formattingContainer"){
			childElement = dom_getFormattingContainerElement(childObjects[i]);
		}else if(childObjects[i].type === "link"){
			childElement = dom_getLinkElement(childObjects[i]);
		}
		contentElement.appendChild(childElement);
	}
	formattingContainerElement.appendChild(contentElement);*/
	
	return formattingContainerElement;
}

function json_getFormattingContainerObject(element){
	
	var formattingContainerObject = new FormattingContainer();
	
	var textAreaElement = element.childNodes[0];
	formattingContainerObject.width = textAreaElement.style.width;
	formattingContainerObject.height = textAreaElement.style.height;
	formattingContainerObject.color = textAreaElement.style.color;
	formattingContainerObject.backgroundColor = textAreaElement.style.backgroundColor;
	formattingContainerObject.fontSize = textAreaElement.style.fontSize;
	formattingContainerObject.fontWeight = textAreaElement.style.fontWeight;
	formattingContainerObject.fontFamily = textAreaElement.style.fontFamily;
	
	formattingContainerObject.content[0] = textAreaElement.value;
	
	/*var childElements = element.childNodes;
	for(var i = 0; i < childElements.length; i++){
		var childObject;
		if(typeof childElements[i].nodeValue === "string"){
			childObject = childElements[i].nodeValue;
		}else if(childElements[i].getAttribute("class") === "formattingContainer"){
			childObject = json_getFormattingContainerObject(childElements[i]);
		}else if(childElements[i].getAttribute("class") === "link"){
			childObject = json_getLinkObject(childElements[i]);
		}
		formattingContainerObject.content.push(childObject);
	}*/
	
	return formattingContainerObject;
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