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
			case "exercise" : element = exercise.toDOM(object); break;
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
			case "exercise" : object = exercise.toJSON(element); break;
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
			nameFieldElement.appendChild(element.createInsert("Exam"));
			
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
			examHeaderElement.appendChild(element.createInsert("Topic"));
			
			// content visibility
			examHeaderElement.appendChild(contentVisibility.create());
			
			// delete Exam
			examHeaderElement.appendChild(element.createRemove());
			
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
		
		return {
			"create":createExamElement
			,"toDOM":dom_getExamElement
			,"toJSON":json_getExamObject
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
			topicHeaderElement.appendChild(element.createRemove());
			
			topicElement.appendChild(topicHeaderElement);
			
			// topic content #################################################################################
			
			var topicContentElement = document.createElement("div");
			topicContentElement.setAttribute("class","topicContentContainer");
			
			// content part
			var contentPartElement = document.createElement("div");
			contentPartElement.setAttribute("class","topicContentPart");
			
			var contentPartHeader = document.createElement("div");
			contentPartHeader.appendChild(helpers.special.attributeContainer({"value":document.createTextNode("Content")}));
			contentPartHeader.appendChild(element.createInsert("Chapter"));
			contentPartHeader.appendChild(contentVisibility.create());
			contentPartElement.appendChild(contentPartHeader);
			
			var contentPartContent = document.createElement("div");
			contentPartElement.appendChild(contentPartContent);
			
			topicContentElement.appendChild(contentPartElement);
			
			// exercises part
			var exercisesPartElement = document.createElement("div");
			exercisesPartElement.setAttribute("class","topicExercisesPart");
			
			var exercisesPartHeader = document.createElement("div");
			exercisesPartHeader.appendChild(helpers.special.attributeContainer({"value":document.createTextNode("Exercises")}));
			exercisesPartHeader.appendChild(element.createInsert("Exercise"));
			exercisesPartHeader.appendChild(contentVisibility.create());
			exercisesPartElement.appendChild(exercisesPartHeader);
			
			var exercisesPartContent = document.createElement("div");
			exercisesPartElement.appendChild(exercisesPartContent);
			
			topicContentElement.appendChild(exercisesPartElement);
			
			// solutions part
			/*var solutionsPartElement = document.createElement("div");
			solutionsPartElement.setAttribute("class","topicSolutionsPart");
			
			var solutionsPartHeader = document.createElement("div");
			solutionsPartHeader.appendChild(helpers.special.attributeContainer({"value":document.createTextNode("Solutions")}));
			solutionsPartHeader.appendChild(helpers.special.attributeContainer({"value":helpers.elements.input({"type":"button","value":"create Chapter","onclick":"datastructure_teacher.chapter.insert(this.parentNode.parentNode.parentNode)"})}));
			solutionsPartElement.appendChild(solutionsPartHeader);
			
			var solutionsPartContent = document.createElement("div");
			solutionsPartElement.appendChild(solutionsPartContent);
			
			topicContentElement.appendChild(solutionsPartElement);*/
			
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
				exercisesContentElement.appendChild(exercise.toDOM(exercisesChildObjects[i]));
			}
			
			/*var solutionsContentElement = topicElement.childNodes[1].childNodes[2].childNodes[1];
			var solutionsChildObjects = object.solutions;
			for(var i = 0; i < solutionsChildObjects.length; i++){
				solutionsContentElement.appendChild(chapter.toDOM(solutionsChildObjects[i]));
			}*/
			
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
				topicObject.exercises.push(exercise.toJSON(exercisesPartChildElements[i]));
			}
			
			/*var solutionsPartChildElements = element.childNodes[1].childNodes[2].childNodes[1].childNodes;
			for(var i = 0; i < solutionsPartChildElements.length; i++){
				topicObject.solutions.push(chapter.toJSON(solutionsPartChildElements[i]));
			}*/
			
			return topicObject;
		}
		
		return {
			"create":createTopicElement
			,"toDOM":dom_getTopicElement
			,"toJSON":json_getTopicObject
		};
	}();

	/**
	 * #########################################################################################
	 * Exercise:
	 */
	var exercise = function(){
		
		function createExerciseElement(exerciseName){
			
			var exerciseElement = document.createElement("div");
			exerciseElement.setAttribute("class","exercise");
			
			// header
			var headerElement = document.createElement("div");
			headerElement.setAttribute("class","exerciseHeader");
			exerciseElement.appendChild(headerElement);
			
			headerElement.appendChild(helpers.special.attributeContainer({"className":"exerciseName","name":"Exercise-Name: ","value":helpers.elements.input({"type":"text","value":exerciseName || "Exercise-Name"})}));
			headerElement.appendChild(element.createRemove());
			
			// content
			var contentElement = document.createElement("div");
			contentElement.setAttribute("class","exerciseContent");
			exerciseElement.appendChild(contentElement);
			
			//-Question
			var questionElement = document.createElement("div");
			questionElement.setAttribute("class","exerciseQuestion");
			contentElement.appendChild(questionElement);
			
			//-Question-Header
			var questionHeaderElement = document.createElement("div");
			questionHeaderElement.setAttribute("class","exerciseQuestionHeader");
			questionElement.appendChild(questionHeaderElement);
			
			questionHeaderElement.appendChild(helpers.special.attributeContainer({"value":document.createTextNode("Question")}));
			questionHeaderElement.appendChild(element.createInsert("Formatting Container"));
			questionHeaderElement.appendChild(contentVisibility.create());
			
			//-Question-Content
			var questionContentElement = document.createElement("div");
			questionContentElement.setAttribute("class","exerciseQuestionContent");
			questionElement.appendChild(questionContentElement);
			
			//-Solution
			var solutionElement = document.createElement("div");
			solutionElement.setAttribute("class","exerciseSolution");
			contentElement.appendChild(solutionElement);
			
			//-Solution-Header
			var solutionHeaderElement = document.createElement("div");
			solutionHeaderElement.setAttribute("class","exerciseSolutionHeader");
			solutionElement.appendChild(solutionHeaderElement);
			
			solutionHeaderElement.appendChild(helpers.special.attributeContainer({"value":document.createTextNode("Solution")}));
			solutionHeaderElement.appendChild(element.createInsert("Formatting Container"));
			solutionHeaderElement.appendChild(contentVisibility.create());
			
			//-Solution-Content
			var solutionContentElement = document.createElement("div");
			solutionContentElement.setAttribute("class","exerciseSolutionContent");
			solutionElement.appendChild(solutionContentElement);
			
			return exerciseElement;
		}
		
		function dom_getExerciseElement(object){
			
			var exerciseElement = createExerciseElement(object.name);
			
			var questionContentElement = exerciseElement.childNodes[1].childNodes[0].childNodes[1];
			var questionObjects = object.question;
			for(var i = 0; i < questionObjects.length; i++){
				questionContentElement.appendChild(formattingContainer.toDOM(questionObjects[i]));
			}
			
			var solutionContentElement = exerciseElement.childNodes[1].childNodes[1].childNodes[1];
			var solutionObjects = object.solution;
			for(var i = 0; i < solutionObjects.length; i++){
				solutionContentElement.appendChild(formattingContainer.toDOM(solutionObjects[i]));
			}
			
			return exerciseElement;
		}
		
		function json_getExerciseObject(element){
			
			var exerciseObject = jsonObjectFactory.create("exercise");
			exerciseObject.name = element.childNodes[0].childNodes[0].childNodes[1].childNodes[0].value;
			
			var questionContentChildElements = element.childNodes[1].childNodes[0].childNodes[1].childNodes;
			var questionObjects = exerciseObject.question;
			for(var i = 0; i < questionContentChildElements.length; i++){
				questionObjects.push(formattingContainer.toJSON(questionContentChildElements[i]));
			}
			
			var solutionContentChildElements = element.childNodes[1].childNodes[1].childNodes[1].childNodes;
			var solutionObjects = exerciseObject.solution;
			for(var i = 0; i < solutionContentChildElements.length; i++){
				solutionObjects.push(formattingContainer.toJSON(solutionContentChildElements[i]));
			}
			
			return exerciseObject;
		}
		
		return {
			"create":createExerciseElement
			,"toDOM":dom_getExerciseElement
			,"toJSON":json_getExerciseObject
		};
	}();
	
	/**
	 * #########################################################################################
	 * Chapter:
	 */
	var chapter = function(){
		
		function createChapterElement(attributeValues){
			
			var chapterElement = document.createElement("div");
			chapterElement.setAttribute("class","chapter");
			chapterElement.setAttribute("draggable","true");
			chapterElement.setAttribute("ondragstart","datastructure_teacher.dragAndDrop.dragStart(event)");
			chapterElement.setAttribute("ondragend","datastructure_teacher.dragAndDrop.dragEnd(event)");
			// chapterElement.setAttribute("ondragover","datastructure_teacher.dragAndDrop.allowDrop(event,this)");
			// chapterElement.setAttribute("ondrop","datastructure_teacher.dragAndDrop.drop(event,this)");
			
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
			chapterHeaderElement.appendChild(element.createInsert("Chapter"));
			
			// create formatting-container
			chapterHeaderElement.appendChild(element.createInsert("Formatting Container"));
			
			// remove chapter
			chapterHeaderElement.appendChild(element.createRemove());
			
			// upload files
			chapterHeaderElement.appendChild(helpers.special.attributeContainer({"value":helpers.elements.input({"type":"file","value":"upload file","onchange":"serverCommunication.uploadFile(this)","multiple":true})}));
			
			// content visibility
			chapterHeaderElement.appendChild(contentVisibility.create());
			
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
		
		return {
			"create":createChapterElement
			,"toDOM":dom_getChapterElement
			,"toJSON":json_getChapterObject
		};
	}();




	/**
	 * #########################################################################################
	 * Formatting-Container:
	 */
	var formattingContainer = function(){
		
		var idValue = 1;
		
		function createFormattingContainerElement(properties){
			
			properties = properties || {"callbackCreate":callbackCreate,"callbackSave":callbackSave};
			
			var id = idValue++;
			
			var formattingContainerElement = document.createElement("div");
			formattingContainerElement.setAttribute("class","formattingContainer");
			
			// head
			var containerHead = document.createElement("div");
			containerHead.appendChild(helpers.special.attributeContainer({"value":helpers.elements.input({"type":"button","value":"to edit","onclick":"texteditor.create({'viewId':'formattingContainerView_" + id + "','editorId':'editableTextArea_" + id + "','callbackCreate':" + properties.callbackCreate + ",'callbackSave':" + (properties.callbackSave || function(){}) + "})"})}));
			containerHead.appendChild(element.createRemove());
			containerHead.appendChild(contentVisibility.create());
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
	
	var element = function(){
		
		function getInsertInput(elementName){
			
			return helpers.special.attributeContainer({"value":helpers.elements.input({"type":"button","value":"create " + elementName,"onclick":"datastructure_teacher.element.insert(this.parentNode.parentNode.parentNode,'" + elementName.replace(/\s/g,'').toLowerCase() + "')"})});
		}
		
		function getRemoveInput(){
			
			return helpers.special.attributeContainer({"value":helpers.elements.input({"type":"button","value":"X","onclick":"datastructure_teacher.element.remove(this.parentNode.parentNode.parentNode)"})});
		}
		
		function insertElement(element,childName){
			
			var childElement = null;
			switch(childName){
				case "exam" : childElement = exam.create(); break;
				case "topic" : childElement = topic.create(); break;
				case "chapter" : childElement = chapter.create(); break;
				case "exercise" : childElement = exercise.create(); break;
				case "formattingcontainer" : childElement = formattingContainer.create(); break;
				default : return;
			}
			element.childNodes[1].appendChild(childElement);
			
			// test
			
			element.childNodes[1].appendChild(dragAndDrop.createDropableSpace());
		}
		
		function removeElement(element){
			
			element.parentNode.removeChild(element);
		}
		
		return {
			"createInsert":getInsertInput
			,"createRemove":getRemoveInput
			,"insert":insertElement
			,"remove":removeElement
		};
	}();
	
	var contentVisibility = function(){
		
		function createContentVisibilityInputElement(){
			return helpers.special.attributeContainer({"name":"Visibility: ","value":helpers.elements.input({"type":"button","value":"-","onclick":"datastructure_teacher.contentVisibility.change(this)"})});
		}
		
		function changeContentVisibility(inputElement){
			
			if(inputElement.value === "-"){
				inputElement.parentNode.parentNode.parentNode.nextSibling.setAttribute("class","unvisible");
				inputElement.value = "+";
			}else{
				inputElement.parentNode.parentNode.parentNode.nextSibling.removeAttribute("class");
				inputElement.value = "-";
			}
		}
		
		return {
			"create":createContentVisibilityInputElement
			,"change":changeContentVisibility
		};
	}();
	
	var dragAndDrop = function(){
		
		function createDropableSpaceElement(){
			
			var draggableDiv = document.createElement("div");
			draggableDiv.setAttribute("class","dropableSpace");
			draggableDiv.setAttribute("ondragover","datastructure_teacher.dragAndDrop.allowDrop(event,this)");
			draggableDiv.setAttribute("ondragleave","datastructure_teacher.dragAndDrop.leaveDrop(event,this)");
			draggableDiv.setAttribute("ondrop","datastructure_teacher.dragAndDrop.drop(event,this)");
			
			return draggableDiv;
		}
		
		function dragStart(event){
			
			event.target.setAttribute("id","draggedElement");
			event.dataTransfer.setData("text/plain",event.target.id);
		}
		
		function dragEnd(event){
			
			event.target.removeAttribute("id");
			/*if(event.dataTransfer.getData("text/plain")){
				event.dataTransfer.clearData("text/plain");
			}*/
		}
		
		function allowDrop(event,element){
			
			if(!element.getAttribute("id")){
				element.setAttribute("id","active");
			}
			
			var id = event.dataTransfer.getData("text/plain");
			if(!(id === element.getAttribute("id")) && !document.getElementById(id).contains(element)){
				event.preventDefault();
			}
		}
		
		function leaveDrop(event,element){
			element.removeAttribute("id");
		}
		
		function drop(event,element){
			event.preventDefault();
			
			var dragElement = document.getElementById(event.dataTransfer.getData("text/plain"));
			
			element.parentNode.insertBefore(createDropableSpaceElement(),element);
			element.parentNode.insertBefore(dragElement,element);
			
			dragElement.parentNode.removeChild(dragElement.nextSibling);
			// element.childNodes[1].appendChild(document.getElementById(event.dataTransfer.getData("text/plain")));
			element.removeAttribute("id");
			/*if(event.dataTransfer.getData("text/plain")){
				event.dataTransfer.clearData("text/plain");
			}*/
		}
		
		return {
			"createDropableSpace":createDropableSpaceElement
			,"dragStart":dragStart
			,"dragEnd":dragEnd
			,"allowDrop":allowDrop
			,"leaveDrop":leaveDrop
			,"drop":drop
		};
	}();
	
	return {
		"toDOM":jsonToDom
		,"toJSON":domToJson
		,"schoolmaterial":schoolmaterial
		,"exam":exam
		,"topic":topic
		,"chapter":chapter
		,"exercise":exercise
		,"formattingContainer":formattingContainer
		,"element":element
		,"contentVisibility":contentVisibility
		,"dragAndDrop":dragAndDrop
	};
}();