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

function createSchoolmaterialElement(profile,nameFieldContent){
	
	var schoolmaterialElement = document.createElement("div");
	schoolmaterialElement.setAttribute("class","schoolmaterial");
	
	// schoolmaterial head
	var nameFieldElement = document.createElement("div");
	
	nameFieldElement.appendChild(document.createTextNode(nameFieldContent));
	if(profile.userType === "teacher"){
		nameFieldElement.appendChild(getInputElement({"type":"button","value":"create Exam","onclick":"insertExamElement(this.parentNode.parentNode)"}));
	}
	schoolmaterialElement.appendChild(nameFieldElement);
	
	// schoolmaterial content
	var contentElement = document.createElement("div");
	schoolmaterialElement.appendChild(contentElement);
	
	return schoolmaterialElement;
}

function dom_getSchoolmaterialElement(profile,object){
	
	var schoolmaterialElement = createSchoolmaterialElement(profile, object.name);
	
	var contentElement = schoolmaterialElement.childNodes[1];
	var childObjects = object.content;
	for(var i = 0; i < childObjects.length; i++){
		contentElement.appendChild(dom_getExamElement(profile, childObjects[i]));
	}
	
	return schoolmaterialElement;
}

function json_getSchoolmaterialObject(profile,element){
	
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

function createExamElement(lectureHeaderFieldValues){
	
	var examElement = document.createElement("div");
	examElement.setAttribute("class","exam");
	
	// lecture head
	var examHeaderElement = document.createElement("div");
	
	// lecture attribute elements ###############################################################################
	
	// name
	var examNameField = document.createElement("span");
	examNameField.setAttribute("id","examName");
	
	var examNameFieldName = document.createElement("span");
	examNameFieldName.appendChild(document.createTextNode("Exam-Name: "));
	examNameField.appendChild(examNameFieldName);
	
	var examNameFieldValue = document.createElement("span");
	examNameFieldValue.appendChild(getInputElement({"type":"text","value":lectureHeaderFieldValues.name || "Exam-Name","width":"100px"}));
	examNameField.appendChild(examNameFieldValue);
	
	examHeaderElement.appendChild(examNameField);
	
	// lecture notifier
	var lectureNotifierField = document.createElement("span");
	lectureNotifierField.setAttribute("id","examLectureNotifier");
	
	var lectureNotifierFieldName = document.createElement("span");
	lectureNotifierFieldName.appendChild(document.createTextNode("Lecture: "));
	lectureNotifierField.appendChild(lectureNotifierFieldName);
	
	var lectureNotifierFieldValue = document.createElement("span");
	lectureNotifierFieldValue.appendChild(getInputElement({"type":"text","value":lectureHeaderFieldValues.lecture || "Lecture","width":"100px"}));
	lectureNotifierField.appendChild(lectureNotifierFieldValue);
	
	examHeaderElement.appendChild(lectureNotifierField);
	
	// class name
	var classNameField = document.createElement("span");
	classNameField.setAttribute("id","examClassName");
	
	var classNameFieldName = document.createElement("span");
	classNameFieldName.appendChild(document.createTextNode("Class: "));
	classNameField.appendChild(classNameFieldName);
	
	var classNameFieldValue = document.createElement("span");
	classNameFieldValue.appendChild(getInputElement({"type":"text","value":lectureHeaderFieldValues.className || "Class","width":"100px"}));
	classNameField.appendChild(classNameFieldValue);
	
	examHeaderElement.appendChild(classNameField);
	
	// author
	var authorNameField = document.createElement("span");
	authorNameField.setAttribute("id","examAuthorName");
	
	var authorNameFieldName = document.createElement("span");
	authorNameFieldName.appendChild(document.createTextNode("Author-Name: "));
	authorNameField.appendChild(authorNameFieldName);
	
	var authorNameFieldValue = document.createElement("span");
	authorNameFieldValue.appendChild(getInputElement({"type":"text","value":lectureHeaderFieldValues.author || "Author-Name"}));
	authorNameField.appendChild(authorNameFieldValue);
	
	examHeaderElement.appendChild(authorNameField);
	
	// last change
	var lastChangeField = document.createElement("span");
	lastChangeField.setAttribute("id","lastChange");
	
	var lastChangeFieldName = document.createElement("span");
	lastChangeFieldName.appendChild(document.createTextNode("Date: "));
	lastChangeField.appendChild(lastChangeFieldName);
	
	var lastChangeFieldValue = document.createElement("span");
	lastChangeFieldValue.appendChild(document.createTextNode(lectureHeaderFieldValues.date || new Date().toLocaleDateString()));
	lastChangeField.appendChild(lastChangeFieldValue);
	
	examHeaderElement.appendChild(lastChangeField);
	
	// exam date
	var examDateField = document.createElement("span");
	examDateField.setAttribute("id","examDate");
	
	var examDateFieldName = document.createElement("span");
	examDateFieldName.appendChild(document.createTextNode("Exam-Date: "));
	examDateField.appendChild(examDateFieldName);
	
	var examDateFieldValue = document.createElement("span");
	examDateFieldValue.appendChild(getInputElement({"type":"text","value":lectureHeaderFieldValues.examDate || ""}));
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
		var childNodeID = examHeaderElement.id;
		switch(childNodeID){
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

function createTopicElement(profile,topicName){
	
	var topicElement = document.createElement("div");
	topicElement.setAttribute("class","topic");
	
	// topic header
	var topicHeaderElement = document.createElement("div");
	
	// topic attribute elements ###############################################################################
	
	// topic name
	var topicNameField = document.createElement("span");
	topicNameField.setAttribute("id","topicName");
	
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
	
	var contentElement = document.createElement("div");
	contentElement.setAttribute("class","topicContent");
	var contentHeader = document.createElement("div");
	contentHeader.appendChild(document.createTextNode("Content"));
	if(profile.userType === "teacher"){
		contentHeader.appendChild(getInputElement({"type":"button","value":"create Chapter","onclick":"insertChapterElement(this.parentNode.parentNode)"}));
	}
	contentElement.appendChild(contentHeader);
	var contentContent = document.createElement("div");
	contentElement.appendChild(contentContent);
	
	topicContentElement.appendChild(contentElement);
	
	// topic exercises
	var exercisesElement = document.createElement("div");
	exercisesElement.setAttribute("class","topicExercises");
	var exercisesHeader = document.createElement("div");
	exercisesHeader.appendChild(document.createTextNode("Exercises"));
	if(profile.userType === "teacher"){
		exercisesHeader.appendChild(getInputElement({"type":"button","value":"create Chapter","onclick":"insertChapterElement(this.parentNode.parentNode)"}));
	}
	exercisesElement.appendChild(exercisesHeader);
	var exercisesContent = document.createElement("div");
	exercisesElement.appendChild(exercisesContent);
	
	topicContentElement.appendChild(exercisesElement);
	
	// topic solutions
	var solutionsElement = document.createElement("div");
	solutionsElement.setAttribute("class","topicSolutions");
	var solutionsHeader = document.createElement("div");
	solutionsHeader.appendChild(document.createTextNode("Solutions"));
	if(profile.userType === "teacher"){
		solutionsHeader.appendChild(getInputElement({"type":"button","value":"create Chapter","onclick":"insertChapterElement(this.parentNode.parentNode)"}));
	}
	solutionsElement.appendChild(solutionsHeader);
	var solutionsContent = document.createElement("div");
	solutionsElement.appendChild(solutionsContent);
	
	topicContentElement.appendChild(solutionsElement);
	
	topicElement.appendChild(topicContentElement);
	
	return topicElement;
}

function dom_getTopicElement(profile,object){
	
	var topicElement = createTopicElement(profile, object.name);
	
	var contentContentElement = topicElement.childNodes[1].childNodes[0].childNodes[1];
	var contentChildObjects = object.content;
	for(var i = 0; i < contentChildObjects.length; i++){
		contentContentElement.appendChild(dom_getChapterElement(profile,contentChildObjects[i]));
	}
	
	var exercisesContentElement = topicElement.childNodes[1].childNodes[1].childNodes[1];
	var exercisesChildObjects = object.exercises;
	for(var i = 0; i < exercisesChildObjects.length; i++){
		exercisesContentElement.appendChild(dom_getChapterElement(profile,exercisesChildObjects[i]));
	}
	
	var solutionsContentElement = topicElement.childNodes[1].childNodes[2].childNodes[1];
	var solutionsChildObjects = object.solutions;
	for(var i = 0; i < solutionsChildObjects.length; i++){
		solutionsContentElement.appendChild(dom_getChapterElement(profile,solutionsChildObjects[i]));
	}
	
	return topicElement;
}

function json_getTopicObject(profile,element){
	
	var topicNameValue;
	if(profile.right === "read"){
		topicNameValue = element.childNodes[0].childNodes[0].nodeValue;
	}else{
		topicNameValue = element.childNodes[0].childNodes[0].value;
	}
	
	var topicObject = new Topic(topicNameValue);
	
	var contentChildElements = element.childNodes[1].childNodes[0].childNodes[1].childNodes;
	for(var i = 0; i < contentChildElements.length; i++){
		topicObject.content.push(json_getChapterObject(profile,contentChildElements[i]));
	}
	
	var exercisesChildElements = element.childNodes[1].childNodes[1].childNodes[1].childNodes;
	for(var i = 0; i < exercisesChildElements.length; i++){
		topicObject.exercises.push(json_getChapterObject(profile,exercisesChildElements[i]));
	}
	
	var solutionsChildElements = element.childNodes[1].childNodes[2].childNodes[1].childNodes;
	for(var i = 0; i < solutionsChildElements.length; i++){
		topicObject.solutions.push(json_getChapterObject(profile,solutionsChildElements[i]));
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
function createChapterElement(profile, nameFieldContent){
	
	var chapterElement = document.createElement("div");
	chapterElement.setAttribute("class","chapter");
	
	// chapter head
	var nameFieldElement = document.createElement("div");
	
	if(profile.userType === "teacher"){
		nameFieldElement.appendChild(getInputElement({"type":"input","value":nameFieldContent,"width":"100px"}));
		nameFieldElement.appendChild(getInputElement({"type":"button","value":"create Sub-Chapter","onclick":"insertChapterElement(this.parentNode.parentNode)"}));
		nameFieldElement.appendChild(getInputElement({"type":"button","value":"create Formatting Container","onclick":"insertFormattingContainerElement(this.parentNode.parentNode)"}));
		nameFieldElement.appendChild(getInputElement({"type":"button","value":"X","onclick":"removeChapterElement(this.parentNode.parentNode)"}));
		nameFieldElement.appendChild(getInputElement({"type":"file","value":"upload file","onchange":"uploadFile(this)","multiple":true}));
	}else{
		nameFieldElement.appendChild(document.createTextNode(nameFieldContent));
	}
	
	chapterElement.appendChild(nameFieldElement);
	
	// chapter content
	var contentElement = document.createElement("div");
	chapterElement.appendChild(contentElement);
	
	return chapterElement;
}

function dom_getChapterElement(profile,object){
	
	var chapterElement = createChapterElement(profile, object.name);
	
	// chapter body|content
	var contentElement = chapterElement.childNodes[1];
	var childObjects = object.content;
	for(var i = 0; i < childObjects.length; i++){
		var childElement;
		if(childObjects[i].type === "chapter"){
			childElement = dom_getChapterElement(profile,childObjects[i]);
		}else{
			childElement = dom_getFormattingContainerElement(profile,childObjects[i]);
		}
		contentElement.appendChild(childElement);
	}
	chapterElement.appendChild(contentElement);
	
	return chapterElement;
}

function json_getChapterObject(profile,element){
	
	var chapterNameValue;
	if(profile.right === "read"){
		chapterNameValue = element.childNodes[0].childNodes[0].nodeValue;
	}else{
		chapterNameValue = element.childNodes[0].childNodes[0].value;
	}
	
	var chapterObject = new Chapter(chapterNameValue);
	
	var childElements = element.childNodes[1].childNodes;
	for(var i = 0; i < childElements.length; i++){
		var childObject;
		if(childElements[i].getAttribute("class") === "chapter"){
			childObject = json_getChapterObject(profile,childElements[i]);
		}else{
			childObject = json_getFormattingContainerObject(profile,childElements[i]);
		}
		chapterObject.content.push(childObject);
	}
	
	return chapterObject;
}


/**
 * #########################################################################################
 * Formatting-Container:
 * 
 * @param object
 * @returns
 */
function createFormattingContainerElement(profile,styleProperties){
	
	var formattingContainerElement = document.createElement("div");
	formattingContainerElement.setAttribute("class","formattingContainer");
	
	var textAreaElement = document.createElement("textarea");
	textAreaElement.setAttribute("style","height:" + styleProperties.height + "; width:" + styleProperties.width + "; color:" + styleProperties.color + "; background-color:" + styleProperties.backgroundColor + "; font-size:" + styleProperties.fontSize + "; font-weight:" + styleProperties.fontWeight + "; font-family:" + styleProperties.fontFamily + "; resize:none;");
	
	//tinymce.init({"selector":textAreaElement});
	
	if(profile.userType === "teacher"){
		
	}else{
		textAreaElement.setAttribute("disabled","disabled");
		textAreaElement.setAttribute("readonly","readonly");
	}
	
	formattingContainerElement.appendChild(textAreaElement);
	
	// formatting container head
	/*var nameFieldElement = document.createElement("div");
	
	if(profile.userType === "teacher"){
		nameFieldElement.appendChild(getInputElement({"type":"input","value":nameFieldContent,"width":"100px"}));
		nameFieldElement.appendChild(getInputElement({"type":"button","value":"create Formatting Container","onclick":"insertFormattingContainerElement(this.parentNode.parentNode)"}));
		nameFieldElement.appendChild(getInputElement({"type":"button","value":"create Link","onclick":"insertLinkElement(this)"}));
		nameFieldElement.appendChild(getInputElement({"type":"button","value":"X","onclick":"removeFormattingContainerElement(this.parentNode.parentNode)"}));
	}else{
		nameFieldElement.appendChild(document.createTextNode(nameFieldContent));
	}
	
	formattingContainerElement.appendChild(nameFieldElement);*/
	
	// formatting container content
	/*var contentElement = document.createElement("div");
	formattingContainerElement.appendChild(contentElement);*/
	
	return formattingContainerElement;
}

function dom_getFormattingContainerElement(profile,object){
	
	var formattingContainerElement = createFormattingContainerElement(profile,object);
	
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

function json_getFormattingContainerObject(profile,element){
	
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
function createLinkElement(profile,nameFieldContent){
	
	
}

function dom_getLinkElement(profile,object){
	
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

function json_getLinkObject(profile,element){
	
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