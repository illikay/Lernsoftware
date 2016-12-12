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

function jsonToDom(profile,object){
	
	var element;
	
	if(object.type === "schoolmaterial"){
		element = dom_getSchoolmaterialElement(profile,object);
	}else if(object.type === "exam"){
		element = dom_getLectureElement(profile,object);
	}else if(object.type === "topic"){
		element = dom_getTopicElement(profile,object);
	}else if(object.type === "chapter"){
		element = dom_getChapterElement(profile,object);
	}else if(object.type === "formattingContainer"){
		element = dom_getFormattingContainerElement(profile,object);
	}else if(object.type === "link"){
		element = dom_getLinkElement(profile,object);
	}
	
	return element;
}

function domToJson(profile,element){
	
	var object;
	
	var classValue = element.getAttribute("class");
	if(classValue === "schoolmaterial"){
		object = json_getSchoolmaterialObject(profile,element);
	}else if(classValue === "exam"){
		object = json_getExamObject(profile,element);
	}else if(classValue === "topic"){
		object = json_getTopicObject(profile,element);
	}else if(classValue === "chapter"){
		object = json_getChapterObject(profile,element);
	}else if(classValue === "formattingContainer"){
		object = json_getFormattingContainerObject(profile,element);
	}else if(classValue === "link"){
		object = json_getLinkObject(profile,element);
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
 * 
 * <div class="exam">
 * 		<div>
 * 		</div>
 * 		<
 * </div>
 */

function createExamElementent(element){
	return element.childNodes[0].childNodes[0];
}

function createExamElement(profile, lectureHeaderFieldValues){
	
	var lectureElement = document.createElement("div");
	lectureElement.setAttribute("class","exam");
	
	// lecture head
	var nameFieldElement = document.createElement("div");
	
	// Attribute Elements
	// author
	var authorValue;
	if(lectureHeaderFieldValues.authorName === null && lectureHeaderFieldValues.authorSurname === null){
		authorValue = profile.name + " " + profile.surname;
	}else{
		authorValue = lectureHeaderFieldValues.authorName + " " + lectureHeaderFieldValues.authorSurname;
	}
	
	// date
	var dateValue;
	if(lectureHeaderFieldValues.date === null){
		dateValue = new Date().toLocaleDateString();
	}else{
		dateValue = lectureHeaderFieldValues.date;
	}
	
	var authorField = document.createElement("span");
	authorField.appendChild(document.createTextNode("Author: " + authorValue));
	var dateField = document.createElement("span");
	dateField.appendChild(document.createTextNode("Date: " + dateValue));
	
	if(profile.userType === "teacher"){
		nameFieldElement.appendChild(getInputElement({"type":"text","value":lectureHeaderFieldValues.name,"width":"100px"}));
		nameFieldElement.appendChild(getInputElement({"type":"button","value":"create Topic","onclick":"insertTopicElement(this.parentNode.parentNode)"}));
		nameFieldElement.appendChild(authorField);
		nameFieldElement.appendChild(dateField);
		nameFieldElement.appendChild(getInputElement({"type":"button","value":"X","onclick":"removeExamElement(this.parentNode.parentNode)"}));
	}else{
		nameFieldElement.appendChild(document.createTextNode(lectureHeaderFieldValues.name));
		nameFieldElement.appendChild(authorField);
		nameFieldElement.appendChild(dateField);
	}
	
	lectureElement.appendChild(nameFieldElement);
	
	// lecture content
	var contentElement = document.createElement("div");
	lectureElement.appendChild(contentElement);
	
	return lectureElement;
}



function dom_getExamElement(profile,object){
	
	var examElement = createExamElement(profile, object);
	
	var contentElement = examElement.childNodes[1];
	var childObjects = object.content;
	for(var i = 0; i < childObjects.length; i++){
		contentElement.appendChild(dom_getTopicElement(profile,childObjects[i]));
	}
	examElement.appendChild(contentElement);
	
	return examElement;
}

function json_getExamObject(profile,element){
	
	var examNameValue;
	var examHeaderElement = element.childNodes[0];
	
	if(profile.right === "read"){
		examNameValue = examHeaderElement.childNodes[0].nodeValue;
	}else{
		examNameValue = examHeaderElement.childNodes[0].value;
	}
	
	var examObject = new Exam(examNameValue);
	
	examObject.authorName = profile.name;
	examObject.authorSurname = profile.surname;
	
	examObject.date = new Date().toLocaleDateString();
	
	
	var childElements = element.childNodes[1].childNodes;
	for(var i = 0; i < childElements.length; i++){
		examObject.content.push(json_getTopicObject(profile,childElements[i]));
	}
	
	return examObject;
}

/**
 * #########################################################################################
 * Topic:
 */

function createTopicElement(profile,nameFieldContent){
	
	var topicElement = document.createElement("div");
	topicElement.setAttribute("class","topic");
	
	// topic header
	var topicHeaderElement = document.createElement("div");
	
	if(profile.userType === "teacher"){
		topicHeaderElement.appendChild(getInputElement({"type":"text","value":nameFieldContent,"width":"100px"}));
		topicHeaderElement.appendChild(getInputElement({"type":"button","value":"X","onclick":"removeTopicElement(this.parentNode.parentNode)"}));
	}else{
		topicHeaderElement.appendChild(document.createTextNode(nameFieldContent));
	}
	
	topicElement.appendChild(topicHeaderElement);
	
	// topic content
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