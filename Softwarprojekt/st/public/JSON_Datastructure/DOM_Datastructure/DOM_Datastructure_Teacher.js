/**
 * Teacher - DOM-Structure:
 * 
 * Provides methods for
 * 	-> converting
 * 			- HTML-Structure to JSON-Objects
 * 			- JSON-Objects to HTML-Structure
 * 
 * 	-> creating single Element-Types
 * 
 * Access-Syntax: datastructure_teacher.<option>
 */

var datastructure_teacher = function(){
	
	function jsonToDom(object){
		
		var element = null;
		
		switch(object.type){
			case "schoolmaterial" : element = schoolmaterial.toDOM(object); break;
			case "exam" : element = lecture.toDOM(object); break;
			case "topic" : element = topic.toDOM(object); break;
			case "chapter" : element = chapter.toDOM(object); break;
			case "formattingContainer" : element = formattingContainer.toDOM(object); break;
			case "link" : element = link.toDOM(object); break;
		}
		
		return element;
	}

	function domToJson(element){
		
		var object = null;
		
		switch(element.getAttribute("class")){
			case "schoolmaterial" : object = schoolmaterial.toJSON(element); break;
			case "exam" : object = exam.toJSON(element); break;
			case "topic" : object = topic.toJSON(element); break;
			case "chapter" : object = chapter.toJSON(element); break;
			case "formattingContainer" : object = formattingContainer.toJSON(element); break;
			case "link" : object = link.toJSON(element); break;
		}
		
		return object;
	}

	/**
	 * #######################################################################
	 * Schoolmaterial
	 */
	var schoolmaterial = function(){
		
		function createSchoolmaterialElement(schoolmaterialName){
			
			var schoolmaterialElement = document.createElement("div");
			schoolmaterialElement.setAttribute("class","schoolmaterial");
			
			// schoolmaterial head
			var nameFieldElement = document.createElement("div");
			
			nameFieldElement.appendChild(document.createTextNode(schoolmaterialName || "Schoolmaterial-Name"));
			nameFieldElement.appendChild(helpers.elements.input({"type":"button","value":"create Exam","onclick":"datastructure_teacher.exam.insert(this.parentNode.parentNode)"}));
			
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
				contentElement.appendChild(exam.toDOM(childObjects[i]));
			}
			
			return schoolmaterialElement;
		}

		function json_getSchoolmaterialObject(element){
			
			var schoolmaterialObject = jsonObjectFactory.create("schoolmaterial",element.childNodes[0].childNodes[0].nodeValue);
			
			var childElements = element.childNodes[1].childNodes;
			for(var i = 0; i < childElements.length; i++){
				schoolmaterialObject.content.push(exam.toJSON(childElements[i]));
			}
			
			return schoolmaterialObject;
		}
		
		return {
			"create":createSchoolmaterialElement
			,"toDOM":dom_getSchoolmaterialElement
			,"toJSON":json_getSchoolmaterialObject
		};
	}();

	/**
	 * #######################################################################
	 * Exam
	 */
	var exam = function(){
		
		function createExamElement(attributeValues){
			
			var examElement = document.createElement("div");
			examElement.setAttribute("class","exam");
			
			// lecture head
			var examHeaderElement = document.createElement("div");
			
			// lecture attribute elements ###############################################################################
			
			if(!attributeValues){
				attributeValues = {};
			}
			
			// name
			examHeaderElement.appendChild(helpers.special.attributeContainer({"className":"examName","name":"Exam-Name: ","value":helpers.elements.input({"type":"text","value":attributeValues.name || "Exam-Name"})}));
			
			// lecture notifier
			examHeaderElement.appendChild(helpers.special.attributeContainer({"className":"examLectureNotifier","name":"Lecture: ","value":helpers.elements.input({"type":"text","value":attributeValues.lecture || "Lecture"})}));
			
			// class name
			examHeaderElement.appendChild(helpers.special.attributeContainer({"className":"examClassName","name":"Class: ","value":helpers.elements.input({"type":"text","value":attributeValues.className || "Class-Name"})}));
			
			// author
			examHeaderElement.appendChild(helpers.special.attributeContainer({"className":"examAuthorName","name":"Author-Name: ","value":helpers.elements.input({"type":"text","value":attributeValues.author || "Author-Name"})}));
			
			// last change
			examHeaderElement.appendChild(helpers.special.attributeContainer({"className":"lastChange","name":"Date: ","value":document.createTextNode(attributeValues.lastChange || new Date().toLocaleDateString())}));
			
			// exam date
			examHeaderElement.appendChild(helpers.special.attributeContainer({"className":"examDate","name":"Exam-Date: ","value":helpers.elements.input({"type":"text","value":attributeValues.examDate || ""})}));
			
			// create Topic
			examHeaderElement.appendChild(helpers.special.attributeContainer({"value":helpers.elements.input({"type":"button","value":"create Topic","onclick":"datastructure_teacher.topic.insert(this.parentNode.parentNode.parentNode)"})}));
			
			// checkbox
			examHeaderElement.appendChild(helpers.special.attributeContainer({"name":"Visibility: ","value":helpers.elements.input({"type":"checkbox","onchange":"changeChildElementVisibility(this)"})}));
			
			// delete Exam
			examHeaderElement.appendChild(helpers.special.attributeContainer({"value":helpers.elements.input({"type":"button","value":"X","onclick":"datastructure_teacher.exam.remove(this.parentNode.parentNode.parentNode)"})}));
			
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
				contentElement.appendChild(topic.toDOM(childObjects[i]));
			}
			// examElement.appendChild(contentElement);
			
			return examElement;
		}

		function json_getExamObject(element){
			
			var examObject = jsonObjectFactory.create("exam");
			
			var examHeaderElements = element.childNodes[0].childNodes;
			
			for(var i = 0; i < examHeaderElements.length; i++){
				var examHeaderElement = examHeaderElements[i];
				var childNodeClass = examHeaderElement.getAttribute("class");
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
				examObject.content.push(topic.toJSON(childElements[i]));
			}
			
			return examObject;
		}

		function insertExamElement(schoolmaterialElement){
			
			var contentElement = schoolmaterialElement.childNodes[1];
			contentElement.appendChild(createExamElement());
		}

		function removeExamElement(examElement){
			
			var schoolmaterialContentElement = examElement.parentNode;
			schoolmaterialContentElement.removeChild(examElement);
		}

		function dropAction(examElement,contentElement){
			examElement.childNodes[1].appendChild(contentElement);
		}
		
		return {
			"create":createExamElement
			,"toDOM":dom_getExamElement
			,"toJSON":json_getExamObject
			,"insert":insertExamElement
			,"remove":removeExamElement
		};
	}();

	/**
	 * #########################################################################################
	 * Topic:
	 */
	var topic = function(){
		
		function createTopicElement(topicName){
			
			var topicElement = document.createElement("div");
			topicElement.setAttribute("class","topic");
			
			// topic header
			var topicHeaderElement = document.createElement("div");
			
			// topic attribute elements ###############################################################################
			
			// topic name
			topicHeaderElement.appendChild(helpers.special.attributeContainer({"className":"topicName","name":"Topic-Name: ","value":helpers.elements.input({"type":"text","value":topicName || "Topic-Name"})}));
			
			// remove topic
			topicHeaderElement.appendChild(helpers.special.attributeContainer({"value":helpers.elements.input({"type":"button","value":"X","onclick":"datastructure_teacher.topic.remove(this.parentNode.parentNode.parentNode)"})}));
			
			topicElement.appendChild(topicHeaderElement);
			
			// topic content #################################################################################
			
			var topicContentElement = document.createElement("div");
			topicContentElement.setAttribute("class","topicContentContainer");
			
			// content part
			var contentPartElement = document.createElement("div");
			contentPartElement.setAttribute("class","topicContentPart");
			
			var contentPartHeader = document.createElement("div");
			contentPartHeader.appendChild(helpers.special.attributeContainer({"value":document.createTextNode("Content")}));
			contentPartHeader.appendChild(helpers.special.attributeContainer({"value":helpers.elements.input({"type":"button","value":"create Chapter","onclick":"datastructure_teacher.chapter.insert(this.parentNode.parentNode.parentNode)"})}));
			contentPartElement.appendChild(contentPartHeader);
			
			var contentPartContent = document.createElement("div");
			contentPartElement.appendChild(contentPartContent);
			
			topicContentElement.appendChild(contentPartElement);
			
			// exercises part
			var exercisesPartElement = document.createElement("div");
			exercisesPartElement.setAttribute("class","topicExercisesPart");
			
			var exercisesPartHeader = document.createElement("div");
			exercisesPartHeader.appendChild(helpers.special.attributeContainer({"value":document.createTextNode("Exercises")}));
			exercisesPartHeader.appendChild(helpers.special.attributeContainer({"value":helpers.elements.input({"type":"button","value":"create Chapter","onclick":"datastructure_teacher.chapter.insert(this.parentNode.parentNode.parentNode)"})}));
			exercisesPartElement.appendChild(exercisesPartHeader);
			
			var exercisesPartContent = document.createElement("div");
			exercisesPartElement.appendChild(exercisesPartContent);
			
			topicContentElement.appendChild(exercisesPartElement);
			
			// solutions part
			var solutionsPartElement = document.createElement("div");
			solutionsPartElement.setAttribute("class","topicSolutionsPart");
			
			var solutionsPartHeader = document.createElement("div");
			solutionsPartHeader.appendChild(helpers.special.attributeContainer({"value":document.createTextNode("Solutions")}));
			solutionsPartHeader.appendChild(helpers.special.attributeContainer({"value":helpers.elements.input({"type":"button","value":"create Chapter","onclick":"datastructure_teacher.chapter.insert(this.parentNode.parentNode.parentNode)"})}));
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
				contentContentElement.appendChild(chapter.toDOM(contentChildObjects[i]));
			}
			
			var exercisesContentElement = topicElement.childNodes[1].childNodes[1].childNodes[1];
			var exercisesChildObjects = object.exercises;
			for(var i = 0; i < exercisesChildObjects.length; i++){
				exercisesContentElement.appendChild(chapter.toDOM(exercisesChildObjects[i]));
			}
			
			var solutionsContentElement = topicElement.childNodes[1].childNodes[2].childNodes[1];
			var solutionsChildObjects = object.solutions;
			for(var i = 0; i < solutionsChildObjects.length; i++){
				solutionsContentElement.appendChild(chapter.toDOM(solutionsChildObjects[i]));
			}
			
			return topicElement;
		}

		function json_getTopicObject(element){
			
			var topicObject = jsonObjectFactory.create("topic",element.childNodes[0].childNodes[0].childNodes[1].childNodes[0].value);
			
			var contentPartChildElements = element.childNodes[1].childNodes[0].childNodes[1].childNodes;
			for(var i = 0; i < contentPartChildElements.length; i++){
				topicObject.content.push(chapter.toJSON(contentPartChildElements[i]));
			}
			
			var exercisesPartChildElements = element.childNodes[1].childNodes[1].childNodes[1].childNodes;
			for(var i = 0; i < exercisesPartChildElements.length; i++){
				topicObject.exercises.push(chapter.toJSON(exercisesPartChildElements[i]));
			}
			
			var solutionsPartChildElements = element.childNodes[1].childNodes[2].childNodes[1].childNodes;
			for(var i = 0; i < solutionsPartChildElements.length; i++){
				topicObject.solutions.push(chapter.toJSON(solutionsPartChildElements[i]));
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
		
		return {
			"create":createTopicElement
			,"toDOM":dom_getTopicElement
			,"toJSON":json_getTopicObject
			,"insert":insertTopicElement
			,"remove":removeTopicElement
		};
	}();

	/**
	 * #########################################################################################
	 * Chapter:
	 * 
	 * @param object
	 * @returns
	 */
	var chapter = function(){
		
		function createChapterElement(attributeValues){
			
			var chapterElement = document.createElement("div");
			chapterElement.setAttribute("class","chapter");
			
			var chapterHeaderElement = document.createElement("div");
			
			// chapter attribute elements ###############################################################################
			
			if(!attributeValues){
				attributeValues = {};
			}
			
			// chapter name
			chapterHeaderElement.appendChild(helpers.special.attributeContainer({"className":"chapterName","name":"Chapter-Name: ","value":helpers.elements.input({"type":"text","value":attributeValues.name || "Chapter-Name"})}));
			
			// exam name
			chapterHeaderElement.appendChild(helpers.special.attributeContainer({"className":"chapterExamName","name":"Exam-Name: ","value":document.createTextNode(attributeValues.exam || "Exam-Name")}));
			
			// work time
			chapterHeaderElement.appendChild(helpers.special.attributeContainer({"className":"chapterWorkTime","name":"Work-Time: ","value":helpers.elements.input({"type":"text","value":attributeValues.workTime || "Work-Time"})}));
			
			// create sub-chapter
			chapterHeaderElement.appendChild(helpers.special.attributeContainer({"value":helpers.elements.input({"type":"button","value":"create Sub-Chapter","onclick":"datastructure_teacher.chapter.insert(this.parentNode.parentNode.parentNode)"})}));
			
			// create formatting-container
			chapterHeaderElement.appendChild(helpers.special.attributeContainer({"value":helpers.elements.input({"type":"button","value":"create Formatting Container","onclick":"datastructure_teacher.formattingContainer.insert(this.parentNode.parentNode.parentNode)"})}));
			
			// remove chapter
			chapterHeaderElement.appendChild(helpers.special.attributeContainer({"value":helpers.elements.input({"type":"button","value":"X","onclick":"datastructure_teacher.chapter.remove(this.parentNode.parentNode.parentNode)"})}));
			
			// upload files
			chapterHeaderElement.appendChild(helpers.special.attributeContainer({"value":helpers.elements.input({"type":"file","value":"upload file","onchange":"serverCommunication.uploadFile(this)","multiple":true})}));
			
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
					childElement = formattingContainer.toDOM(childObjects[i]);
				}
				contentElement.appendChild(childElement);
			}
			chapterElement.appendChild(contentElement);
			
			return chapterElement;
		}

		function json_getChapterObject(element){
			
			var chapterObject = jsonObjectFactory.create("chapter");
			
			// element.childNodes[0].childNodes[0].value
			
			var chapterHeaderElements = element.childNodes[0].childNodes;
			
			for(var i = 0; i < chapterHeaderElements.length; i++){
				var chapterHeaderElement = chapterHeaderElements[i];
				var childNodeClass = chapterHeaderElement.getAttribute("class");
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
					childObject = formattingContainer.toJSON(childElements[i]);
				}
				chapterObject.content.push(childObject);
			}
			
			return chapterObject;
		}

		function insertChapterElement(element){
			
			var contentElement = element.childNodes[1];
			contentElement.appendChild(createChapterElement());
		}

		function removeChapterElement(chapterElement){
			
			var parentElement = chapterElement.parentNode;
			parentElement.removeChild(chapterElement);
		}
		
		return {
			"create":createChapterElement
			,"toDOM":dom_getChapterElement
			,"toJSON":json_getChapterObject
			,"insert":insertChapterElement
			,"remove":removeChapterElement
		};
	}();




	/**
	 * #########################################################################################
	 * Formatting-Container:
	 */
	var formattingContainer = function(){
		
		var idValue = 1;
		
		function createFormattingContainerElement(properties){
			
			var id = idValue++;
			
			var formattingContainerElement = document.createElement("div");
			formattingContainerElement.setAttribute("class","formattingContainer");
			
			// head
			var containerHead = document.createElement("div");
			containerHead.appendChild(helpers.special.attributeContainer({"value":helpers.elements.input({"type":"button","value":"to edit","onclick":"texteditor.create({'viewId':'formattingContainerView_" + id + "','editorId':'editableTextArea_" + id + "','callbackCreate':" + properties.callbackCreate + ",'callbackSave':" + (properties.callbackSave || function(){}) + "})"})}));
			containerHead.appendChild(helpers.special.attributeContainer({"value":helpers.elements.input({"type":"button","value":"X","onclick":"datastructure_teacher.formattingContainer.remove(this.parentNode.parentNode.parentNode)"})}));
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
			
			var formattingContainerObject = jsonObjectFactory.create("formattingContainer");
			
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
		
		return {
			"create":createFormattingContainerElement
			,"toDOM":dom_getFormattingContainerElement
			,"toJSON":json_getFormattingContainerObject
			,"insert":insertFormattingContainerElement
			,"remove":removeFormattingContainerElement
		};
	}();
	
	/**
	 * ##########################################################################################
	 * Link:
	 */
	var link = function(){
		
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
			var link = jsonObjectFactory.create("link");
			link.reference = element.getAttribute("href");
			
			// link content
			var childElements = element.childNodes;
			for(var i = 0; i < childObjects.length; i++){
				link.content.push(json_getFormattingContainerObject(childElements[i]));
			}
			
			return link;
		}
		
		return {
			"toDOM":dom_getLinkElement
			,"toJSON":json_getLinkObject
		};
	}();
	
	return {
		"toDOM":jsonToDom
		,"toJSON":domToJson
		,"schoolmaterial":schoolmaterial
		,"exam":exam
		,"topic":topic
		,"chapter":chapter
		,"formattingContainer":formattingContainer
	};
}();