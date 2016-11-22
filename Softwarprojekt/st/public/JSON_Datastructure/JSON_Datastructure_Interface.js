/**
 * Provides methods for converting:
 * 		- HTML-Structure to JSON-Objects
 * 		- JSON-Objects to HTML-Structure
 */

var bg_schoolmaterial = "#ffffff";
var border_schoolmaterial = "3px solid #000000";
var bg_lecture = "#ff0000";
var border_lecture = "3px solid #770000";
var bg_topic = "#00ff00";
var border_topic = "1px solid #007700";
var bg_chapter = "#0000ff";
var border_chapter = "1px solid #000077";
var bg_formattingContainer = "#ff00ff";
var border_formattingContainer = "1px solid #770077";
var bg_link = "#00ffff";
var border_link = "1px solid #007777";

var width = "500px";
var height = "30px";

function jsonToDom(profile,object){
	
	var element;
	
	if(object.type === "schoolmaterial"){
		element = dom_getSchoolmaterialElement(profile, object);
	}else if(object.type === "lecture"){
		element = dom_getLectureElement(profile, object);
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

function domToJson(element){
	
	var object;
	
	var classValue = element.getAttribute("class");
	if(classValue === "schoolmaterial"){
		object = json_getSchoolmaterialObject(element);
	}else if(classValue === "lecture"){
		object = json_getLectureObject(element);
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
	schoolmaterialElement.setAttribute("style","position:relative; left:40px;");
	
	// schoolmaterial head
	var nameFieldElement = document.createElement("div");
	nameFieldElement.setAttribute("style","width:" + width + "; height:" + height + "; background-color:" + bg_schoolmaterial + "; border:" + border_schoolmaterial + ";");
	
	nameFieldElement.appendChild(document.createTextNode(nameFieldContent));
	if(profile.userType === "teacher"){
		nameFieldElement.appendChild(getInputElement({"type":"button","value":"create Lecture","onclick":"insertLectureElement(this.parentNode.parentNode)"}));
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
		contentElement.appendChild(dom_getLectureElement(profile, childObjects[i]));
	}
	
	return schoolmaterialElement;
}

function json_getSchoolmaterialObject(profile,element){
	
	var schoolmaterialObject = new Schoolmaterial();
	
	var childElements = element.childNodes;
	for(var i = 0; i < childElements.length; i++){
		schoolmaterialObject.content.push(json_getLectureObject(profile,childElements[i]));
	}
	
	return schoolmaterialObject;
}

/**
 * #######################################################################
 * Lecture
 * @param profile
 * @param nameFieldContent
 * @returns
 */

function createLectureElement(profile, nameFieldContent){
	
	var lectureElement = document.createElement("div");
	lectureElement.setAttribute("class","lecture");
	lectureElement.setAttribute("style","position:relative; left:40px;");
	
	// lecture head
	var nameFieldElement = document.createElement("div");
	nameFieldElement.setAttribute("style","width:" + width + "; height:" + height + "; background-color:" + bg_lecture + "; border:" + border_lecture + ";");
	
	if(profile.userType === "teacher"){
		nameFieldElement.appendChild(getInputElement({"type":"input","value":nameFieldContent,"width":"100px"}));
		nameFieldElement.appendChild(getInputElement({"type":"button","value":"create Topic","onclick":"insertTopicElement(this.parentNode.parentNode)"}));
		nameFieldElement.appendChild(getInputElement({"type":"button","value":"X","onclick":"removeLectureElement(this.parentNode.parentNode)"}));
	}else{
		nameFieldElement.appendChild(document.createTextNode(nameFieldContent));
	}
	
	lectureElement.appendChild(nameFieldElement);
	
	// lecture content
	var contentElement = document.createElement("div");
	lectureElement.appendChild(contentElement);
	
	return lectureElement;
}

function dom_getLectureElement(profile,object){
	
	var lectureElement = createLectureElement(profile, object.name);
	
	var contentElement = lectureElement.childNodes[1];
	var childObjects = object.content;
	for(var i = 0; i < childObjects.length; i++){
		contentElement.appendChild(dom_getTopicElement(profile,childObjects[i]));
	}
	lectureElement.appendChild(contentElement);
	
	return lectureElement;
}

function json_getLectureObject(profile,element){
	
	var lectureNameValue;
	
	if(profile.right === "read"){
		lectureNameValue = element.childNodes[0].childNodes[0].nodeValue;
	}else{
		lectureNameValue = element.childNodes[0].childNodes[0].value;
	}
	
	var lectureObject = new Lecture(lectureNameValue);
	
	var childElements = element.childNodes[1].childNodes;
	for(var i = 0; i < childElements.length; i++){
		lectureObject.content.push(json_getTopicObject(profile,childElements[i]));
	}
	
	return lectureObject;
}

/**
 * #########################################################################################
 * Topic:
 */

function createTopicElement(profile,nameFieldContent){
	
	var topicElement = document.createElement("div");
	topicElement.setAttribute("class","topic");
	topicElement.setAttribute("style","position:relative; left:40px;");
	
	// topic header
	var topicHeaderElement = document.createElement("div");
	topicHeaderElement.setAttribute("style","height:" + height + "; width:" + width + "; border:" + border_topic + "; background-color:" + bg_topic + ";");
	
	if(profile.userType === "teacher"){
		topicHeaderElement.appendChild(getInputElement({"type":"text","value":nameFieldContent,"width":"100px"}));
		topicHeaderElement.appendChild(getInputElement({"type":"button","value":"X","onclick":"removeTopicElement(this.parentNode.parentNode)"}));
	}else{
		topicHeaderElement.appendChild(document.createTextNode(nameFieldContent));
	}
	
	topicElement.appendChild(topicHeaderElement);
	
	// topic content
	var topicContentElement = document.createElement("div");
	topicContentElement.setAttribute("style","position:relative; left:40px;");
	
	var contentElement = document.createElement("div");
	var contentHeader = document.createElement("div");
	contentHeader.setAttribute("style","height:" + height + "; width:200px; border:" + border_topic + "; background-color:" + bg_topic + ";");
	contentHeader.appendChild(document.createTextNode("Content"));
	if(profile.userType === "teacher"){
		contentHeader.appendChild(getInputElement({"type":"button","value":"create Chapter","onclick":"insertChapterElement(this.parentNode.parentNode)"}));
	}
	contentElement.appendChild(contentHeader);
	var content = document.createElement("div");
	contentElement.appendChild(content);
	
	topicContentElement.appendChild(contentElement);
	
	// topic exercises
	var exercisesElement = document.createElement("div");
	var exercisesHeader = document.createElement("div");
	exercisesHeader.setAttribute("style","height:" + height + "; width:200px; border:" + border_topic + "; background-color:" + bg_topic + ";");
	exercisesHeader.appendChild(document.createTextNode("Exercises"));
	if(profile.userType === "teacher"){
		exercisesHeader.appendChild(getInputElement({"type":"button","value":"create Chapter","onclick":"insertChapterElement(this.parentNode.parentNode)"}));
	}
	exercisesElement.appendChild(exercisesHeader);
	content = document.createElement("div");
	exercisesElement.appendChild(content);
	
	topicContentElement.appendChild(exercisesElement);
	
	// topic solutions
	var solutionsElement = document.createElement("div");
	var solutionsHeader = document.createElement("div");
	solutionsHeader.setAttribute("style","height:" + height + "; width:200px; border:" + border_topic + "; background-color:" + bg_topic + ";");
	solutionsHeader.appendChild(document.createTextNode("Solutions"));
	if(profile.userType === "teacher"){
		solutionsHeader.appendChild(getInputElement({"type":"button","value":"create Chapter","onclick":"insertChapterElement(this.parentNode.parentNode)"}));
	}
	solutionsElement.appendChild(solutionsHeader);
	content = document.createElement("div");
	solutionsElement.appendChild(content);
	
	topicContentElement.appendChild(solutionsElement);
	
	topicElement.appendChild(topicContentElement);
	
	return topicElement;
}

function dom_getTopicElement(profile,object){
	
	var topicElement = createTopicElement(profile, object.name);
	
	var contentContentElement = topicElement.childNodes[1].childNodes[1].childNodes[0].childNodes[1];
	var contentChildObjects = object.content;
	for(var i = 0; i < contentChildObjects.length; i++){
		contentContentElement.appendChild(dom_getChapterElement(profile,contentChildObjects[i]));
	}
	topicElement.appendChild(contentContentElement);
	
	var exercisesContentElement = topicElement.childNodes[1].childNodes[1].childNodes[1].childNodes[1];
	var exercisesChildObjects = object.exercises;
	for(var i = 0; i < exercisesChildObjects.length; i++){
		exercisesContentElement.appendChild(dom_getChapterElement(profile,exercisesChildObjects[i]));
	}
	topicElement.appendChild(exercisesContentElement);
	
	var solutionsElement = topicElement.childNodes[1].childNodes[1].childNodes[2].childNodes[1];
	var solutionsChildObjects = object.solutions;
	for(var i = 0; i < solutionsChildObjects.length; i++){
		solutionsContentElement.appendChild(dom_getChapterElement(profile,solutionsChildObjects[i]));
	}
	topicElement.appendChild(solutionsContentElement);
	
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
	
	var contentChildElements = element.childNodes[1].childNodes[0].childNodes[1];
	for(var i = 0; i < contentChildElements.length; i++){
		topicObject.content.push(json_getChapterObject(profile,contentChildElements[i]));
	}
	
	var exercisesChildElements = element.childNodes[1].childNodes[1].childNodes[1];
	for(var i = 0; i < exercisesChildElements.length; i++){
		topicObject.exercises.push(json_getChapterObject(profile,exercisesChildElements[i]));
	}
	
	var solutionsChildElements = element.childNodes[1].childNodes[2].childNodes[1];
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
	chapterElement.setAttribute("style","position:relative; left:40px;");
	
	// chapter head
	var nameFieldElement = document.createElement("div");
	nameFieldElement.setAttribute("style","width:" + width + "; height:" + height + "; background-color:" + bg_chapter + "; border:" + border_chapter + ";");
	
	if(profile.userType === "teacher"){
		nameFieldElement.appendChild(getInputElement({"type":"input","value":nameFieldContent,"width":"100px"}));
		nameFieldElement.appendChild(getInputElement({"type":"button","value":"create Chapter","onclick":"insertChapterElement(this.parentNode.parentNode)"}));
		nameFieldElement.appendChild(getInputElement({"type":"button","value":"create Formatting Container","onclick":"insertFormattingContainerElement(this.parentNode.parentNode)"}));
		nameFieldElement.appendChild(getInputElement({"type":"button","value":"X","onclick":"removeChapterElement(this.parentNode.parentNode)"}));
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
			childElement = dom_getFormattingContainerElement(childObjects[i]);
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
			childObject = json_getChapterObject(childElements[i]);
		}else{
			childObject = json_getFormattingContainerObject(childElements[i]);
		}
		chapter.content.push(childObject);
	}
	
	return chapter;
}


/**
 * #########################################################################################
 * Formatting-Container:
 * 
 * @param object
 * @returns
 */
function createFormattingContainerElement(profile,nameFieldContent){
	
	var formattingContainerElement = document.createElement("div");
	formattingContainerElement.setAttribute("class","formattingContainer");
	formattingContainerElement.setAttribute("style","position:relative; left:40px;");
	
	// formatting container head
	var nameFieldElement = document.createElement("div");
	nameFieldElement.setAttribute("style","height:" + height + "; width:" + width + "; border:" + border_formattingContainer + "; background-color:" + bg_formattingContainer + ";");
	
	if(profile.userType === "teacher"){
		nameFieldElement.appendChild(getInputElement({"type":"input","value":nameFieldContent,"width":"100px"}));
		nameFieldElement.appendChild(getInputElement({"type":"button","value":"create Formatting Container","onclick":"insertFormattingContainerElement(this.parentNode.parentNode)"}));
		nameFieldElement.appendChild(getInputElement({"type":"button","value":"create Link","onclick":"insertLinkElement(this)"}));
		nameFieldElement.appendChild(getInputElement({"type":"button","value":"X","onclick":"removeFormattingContainerElement(this.parentNode.parentNode)"}));
	}else{
		nameFieldElement.appendChild(document.createTextNode(nameFieldContent));
	}
	
	formattingContainerElement.appendChild(nameFieldElement);
	
	// formatting container content
	var contentElement = document.createElement("div");
	formattingContainerElement.appendChild(contentElement);
	
	return formattingContainerElement;
}

function dom_getFormattingContainerElement(profile,object){
	
	var formattingContainerElement = createTransformattingContainerElement(profile,object.name);
	
	var contentElement = formattingContainerElement.childNodes[1];
	var childObjects = object.content;
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
	formattingContainerElement.appendChild(contentElement);
	
	return formattingContainerElement;
}

function json_getFormattingContainerObject(element){
	
	var formattingContainerObject = new FormattingContainer();
	
	var childElements = element.childNodes;
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
	}
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