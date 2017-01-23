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
		
		var schoolmaterialClassName = "schoolmaterial";
		function getSchoolmaterialClassName(){
			return schoolmaterialClassName;
		}
		
		function createSchoolmaterialElement(schoolmaterialName){
			
			var schoolmaterialElement = document.createElement("div");
			schoolmaterialElement.setAttribute("class",schoolmaterialClassName);
			
			// schoolmaterial head
			var nameFieldElement = document.createElement("div");
			
			nameFieldElement.appendChild(document.createTextNode(schoolmaterialName || "Schoolmaterial-Name"));
			nameFieldElement.appendChild(element.createInsert(exam.getClass()));
			
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
				if(i === 0){
					contentElement.appendChild(dragAndDrop.createDropableSpace(exam.getClass()));
				}
				contentElement.appendChild(exam.toDOM(childObjects[i]));
				contentElement.appendChild(dragAndDrop.createDropableSpace(exam.getClass()));
			}
			
			return schoolmaterialElement;
		}

		function json_getSchoolmaterialObject(element){
			
			var schoolmaterialObject = jsonObjectFactory.create("schoolmaterial",element.childNodes[0].childNodes[0].nodeValue);
			
			var childElements = element.childNodes[1].childNodes;
			for(var i = 1; i < childElements.length; i+=2){
				schoolmaterialObject.content.push(exam.toJSON(childElements[i]));
			}
			
			return schoolmaterialObject;
		}
		
		return {
			"getClassName":getSchoolmaterialClassName
			,"create":createSchoolmaterialElement
			,"toDOM":dom_getSchoolmaterialElement
			,"toJSON":json_getSchoolmaterialObject
		};
	}();

	/**
	 * #######################################################################
	 * Exam
	 */
	var exam = function(){
		
		var examClassName = "exam";
		function getExamClassName(){
			return examClassName;
		}
		
		var idCounter = 0;
		function createExamElement(attributeValues){
			
			if(!attributeValues){
				attributeValues = {};
			}
			
			var examElement = document.createElement("div");
			examElement.setAttribute("class",examClassName);
			
			examElement.setAttribute("id",attributeValues.id || ("exam_" + idCounter++));
			
			// exam head
			var examHeaderElement = document.createElement("div");
			dragAndDrop.createDropableSpaceFunctionality(examHeaderElement,examClassName,false);
			
			// exam attribute elements ###############################################################################
			
			examHeaderElement.appendChild(helpers.special.attributeContainer({"value":document.createTextNode("Exam")})); // attributeValues.name || "Exam-Name"
			
			// name
			var nameInputElement = helpers.elements.input({"type":"text","value":attributeValues.name || "Exam-Name"});
			element.setNameConnectionFunctionality(nameInputElement,true);
			examHeaderElement.appendChild(helpers.special.attributeContainer({"className":"examName","name":"Exam-Name: ","value":nameInputElement}));
			
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
			
			// properties
			examHeaderElement.appendChild(helpers.special.attributeContainer({"value":helpers.elements.input({"type":"button","value":"properties","onclick":"datastructure_teacher.element.createPropertiesView(this.parentNode.parentNode)"})}));
			
			// create Topic
			examHeaderElement.appendChild(element.createInsert(topic.getClass()));
			
			// content visibility
			examHeaderElement.appendChild(contentVisibility.create());
			
			// delete Exam
			// examHeaderElement.appendChild(element.createRemove());
			
			examElement.appendChild(examHeaderElement);
			
			element.setPropertiesVisibility(examHeaderElement);
			
			// lecture content #################################################################################
			
			var contentElement = document.createElement("div");
			examElement.appendChild(contentElement);
			
			return examElement;
		}

		function dom_getExamElement(object){
			
			var examElement = createExamElement(object);
			
			var contentElement = examElement.childNodes[1];
			var childObjects = object.content;
			for(var i = 0; i < childObjects.length; i++){
				if(i === 0){
					contentElement.appendChild(dragAndDrop.createDropableSpace(topic.getClass()));
				}
				contentElement.appendChild(topic.toDOM(childObjects[i]));
				contentElement.appendChild(dragAndDrop.createDropableSpace(topic.getClass()));
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
					case "examName" : examObject.name = examHeaderElement.childNodes[1].childNodes[0].value; break;
					case "examLectureNotifier" : examObject.lecture = examHeaderElement.childNodes[1].childNodes[0].value; break;
					case "examClassName" : examObject.className = examHeaderElement.childNodes[1].childNodes[0].value; break;
					case "examAuthorName" : examObject.author = examHeaderElement.childNodes[1].childNodes[0].value; break;
					case "lastChange" : examObject.lastChange = new Date().toLocaleDateString(); break;
					case "examDate" : examObject.examDate = examHeaderElement.childNodes[1].childNodes[0].value; break;
				}
			}
			
			var childElements = element.childNodes[1].childNodes;
			for(var i = 1; i < childElements.length; i+=2){
				examObject.content.push(topic.toJSON(childElements[i]));
			}
			
			return examObject;
		}
		
		return {
			"getClass":getExamClassName
			,"create":createExamElement
			,"toDOM":dom_getExamElement
			,"toJSON":json_getExamObject
		};
	}();

	/**
	 * #########################################################################################
	 * Topic:
	 */
	var topic = function(){
		
		var topicClassName = "topic";
		function getTopicClassName(){
			return topicClassName;
		}
		
		function createTopicElement(topicName){
			
			var topicElement = document.createElement("div");
			topicElement.setAttribute("class",topicClassName);
			
			// topic header
			var topicHeaderElement = document.createElement("div");
			dragAndDrop.createDragableFunctionality(topicHeaderElement);
			
			// topic attribute elements ###############################################################################
			
			topicHeaderElement.appendChild(helpers.special.attributeContainer({"value":document.createTextNode("Topic")}));
			
			topicHeaderElement.appendChild(helpers.special.attributeContainer({"value":helpers.elements.input({"type":"button","value":"properties","onclick":"datastructure_teacher.element.createPropertiesView(this.parentNode.parentNode)"})}));
			
			// topic name
			topicHeaderElement.appendChild(helpers.special.attributeContainer({"className":"topicName","name":"Topic-Name: ","value":helpers.elements.input({"type":"text","value":topicName || "Topic-Name"})}));
			
			// remove topic
			topicHeaderElement.appendChild(element.createRemove());
			
			topicElement.appendChild(topicHeaderElement);
			element.setPropertiesVisibility(topicHeaderElement);
			
			// topic content #################################################################################
			
			var topicContentElement = document.createElement("div");
			topicContentElement.setAttribute("class","topicContentContainer");
			
			// content part
			var contentPartElement = document.createElement("div");
			contentPartElement.setAttribute("class","topicContentPart");
			
			var contentPartHeader = document.createElement("div");
			contentPartHeader.setAttribute("class","topicContentHeader");
			dragAndDrop.createDropableSpaceFunctionality(contentPartHeader,"topicContentHeader",false);
			contentPartHeader.appendChild(helpers.special.attributeContainer({"value":document.createTextNode("Content")}));
			contentPartHeader.appendChild(element.createInsert(chapter.getClass()));
			contentPartHeader.appendChild(contentVisibility.create());
			contentPartElement.appendChild(contentPartHeader);
			
			var contentPartContent = document.createElement("div");
			contentPartElement.appendChild(contentPartContent);
			
			topicContentElement.appendChild(contentPartElement);
			
			// exercises part
			var exercisesPartElement = document.createElement("div");
			exercisesPartElement.setAttribute("class","topicExercisesPart");
			
			var exercisesPartHeader = document.createElement("div");
			exercisesPartHeader.setAttribute("class","topicExercisesHeader");
			dragAndDrop.createDropableSpaceFunctionality(exercisesPartHeader,"topicExercisesHeader",false);
			exercisesPartHeader.appendChild(helpers.special.attributeContainer({"value":document.createTextNode("Exercises")}));
			exercisesPartHeader.appendChild(element.createInsert(exercise.getClass()));
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
				if(i === 0){
					contentContentElement.appendChild(dragAndDrop.createDropableSpace(chapter.getClass()));
				}
				contentContentElement.appendChild(chapter.toDOM(contentChildObjects[i]));
				contentContentElement.appendChild(dragAndDrop.createDropableSpace(chapter.getClass()));
			}
			
			var exercisesContentElement = topicElement.childNodes[1].childNodes[1].childNodes[1];
			var exercisesChildObjects = object.exercises;
			for(var i = 0; i < exercisesChildObjects.length; i++){
				if(i === 0){
					exercisesContentElement.appendChild(dragAndDrop.createDropableSpace(exercise.getClass()));
				}
				exercisesContentElement.appendChild(exercise.toDOM(exercisesChildObjects[i]));
				exercisesContentElement.appendChild(dragAndDrop.createDropableSpace(exercise.getClass()));
			}
			
			/*var solutionsContentElement = topicElement.childNodes[1].childNodes[2].childNodes[1];
			var solutionsChildObjects = object.solutions;
			for(var i = 0; i < solutionsChildObjects.length; i++){
				solutionsContentElement.appendChild(chapter.toDOM(solutionsChildObjects[i]));
			}*/
			
			return topicElement;
		}

		function json_getTopicObject(element){
			
			var topicObject = jsonObjectFactory.create("topic",element.childNodes[0].childNodes[2].childNodes[1].childNodes[0].value);
			
			var contentPartChildElements = element.childNodes[1].childNodes[0].childNodes[1].childNodes;
			for(var i = 1; i < contentPartChildElements.length; i+=2){
				topicObject.content.push(chapter.toJSON(contentPartChildElements[i]));
			}
			
			var exercisesPartChildElements = element.childNodes[1].childNodes[1].childNodes[1].childNodes;
			for(var i = 1; i < exercisesPartChildElements.length; i+=2){
				topicObject.exercises.push(exercise.toJSON(exercisesPartChildElements[i]));
			}
			
			/*var solutionsPartChildElements = element.childNodes[1].childNodes[2].childNodes[1].childNodes;
			for(var i = 0; i < solutionsPartChildElements.length; i++){
				topicObject.solutions.push(chapter.toJSON(solutionsPartChildElements[i]));
			}*/
			
			return topicObject;
		}
		
		return {
			"getClass":getTopicClassName
			,"create":createTopicElement
			,"toDOM":dom_getTopicElement
			,"toJSON":json_getTopicObject
		};
	}();

	/**
	 * #########################################################################################
	 * Exercise:
	 */
	var exercise = function(){
		
		var exerciseClassName = "exercise";
		function getExerciseClassName(){
			return exerciseClassName;
		}
		
		function createExerciseElement(exerciseName){
			
			var exerciseElement = document.createElement("div");
			exerciseElement.setAttribute("class",exerciseClassName);
			
			// header
			var headerElement = document.createElement("div");
			headerElement.setAttribute("class","exerciseHeader");
			dragAndDrop.createDragableFunctionality(headerElement);
			exerciseElement.appendChild(headerElement);
			
			headerElement.appendChild(helpers.special.attributeContainer({"value":document.createTextNode("Exercise")}));
			headerElement.appendChild(helpers.special.attributeContainer({"value":helpers.elements.input({"type":"button","value":"properties","onclick":"datastructure_teacher.element.createPropertiesView(this.parentNode.parentNode)"})}));
			headerElement.appendChild(helpers.special.attributeContainer({"className":"exerciseName","name":"Exercise-Name: ","value":helpers.elements.input({"type":"text","value":exerciseName || "Exercise-Name"})}));
			headerElement.appendChild(element.createRemove());
			
			element.setPropertiesVisibility(headerElement);
			
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
			dragAndDrop.createDropableSpaceFunctionality(questionHeaderElement,"exerciseQuestionHeader",false);
			questionElement.appendChild(questionHeaderElement);
			
			questionHeaderElement.appendChild(helpers.special.attributeContainer({"value":document.createTextNode("Question")}));
			questionHeaderElement.appendChild(element.createInsert(formattingContainer.getClass()));
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
			dragAndDrop.createDropableSpaceFunctionality(solutionHeaderElement,"exerciseSolutionHeader",false);
			solutionElement.appendChild(solutionHeaderElement);
			
			solutionHeaderElement.appendChild(helpers.special.attributeContainer({"value":document.createTextNode("Solution")}));
			solutionHeaderElement.appendChild(element.createInsert(formattingContainer.getClass()));
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
				if(i === 0){
					questionContentElement.appendChild(dragAndDrop.createDropableSpace(formattingContainer.getClass()));
				}
				questionContentElement.appendChild(formattingContainer.toDOM(questionObjects[i]));
				questionContentElement.appendChild(dragAndDrop.createDropableSpace(formattingContainer.getClass()));
			}
			
			var solutionContentElement = exerciseElement.childNodes[1].childNodes[1].childNodes[1];
			var solutionObjects = object.solution;
			for(var i = 0; i < solutionObjects.length; i++){
				if(i === 0){
					solutionContentElement.appendChild(dragAndDrop.createDropableSpace(formattingContainer.getClass()));
				}
				solutionContentElement.appendChild(formattingContainer.toDOM(solutionObjects[i]));
				solutionContentElement.appendChild(dragAndDrop.createDropableSpace(formattingContainer.getClass()));
			}
			
			return exerciseElement;
		}
		
		function json_getExerciseObject(element){
			
			var exerciseObject = jsonObjectFactory.create("exercise");
			exerciseObject.name = element.childNodes[0].childNodes[2].childNodes[1].childNodes[0].value;
			
			var questionContentChildElements = element.childNodes[1].childNodes[0].childNodes[1].childNodes;
			var questionObjects = exerciseObject.question;
			for(var i = 1; i < questionContentChildElements.length; i+=2){
				questionObjects.push(formattingContainer.toJSON(questionContentChildElements[i]));
			}
			
			var solutionContentChildElements = element.childNodes[1].childNodes[1].childNodes[1].childNodes;
			var solutionObjects = exerciseObject.solution;
			for(var i = 1; i < solutionContentChildElements.length; i+=2){
				solutionObjects.push(formattingContainer.toJSON(solutionContentChildElements[i]));
			}
			
			return exerciseObject;
		}
		
		return {
			"getClass":getExerciseClassName
			,"create":createExerciseElement
			,"toDOM":dom_getExerciseElement
			,"toJSON":json_getExerciseObject
		};
	}();
	
	/**
	 * #########################################################################################
	 * Chapter:
	 */
	var chapter = function(){
		
		var chapterClassName = "chapter";
		function getChapterClassName(){
			return chapterClassName;
		}
		
		function createChapterElement(attributeValues){
			
			var chapterElement = document.createElement("div");
			chapterElement.setAttribute("class",chapterClassName);
			
			// chapterElement.setAttribute("ondragover","datastructure_teacher.dragAndDrop.allowDrop(event,this)");
			// chapterElement.setAttribute("ondrop","datastructure_teacher.dragAndDrop.drop(event,this)");
			
			var chapterHeaderElement = document.createElement("div");
			chapterHeaderElement.setAttribute("class","chapterHeader");
			dragAndDrop.createDragableFunctionality(chapterHeaderElement);
			dragAndDrop.createDropableSpaceFunctionality(chapterHeaderElement,"chapterHeader",false);
			// chapter attribute elements ###############################################################################
			
			if(!attributeValues){
				attributeValues = {};
			}
			
			chapterHeaderElement.appendChild(helpers.special.attributeContainer({"value":document.createTextNode("Chapter")}));
			
			chapterHeaderElement.appendChild(helpers.special.attributeContainer({"value":helpers.elements.input({"type":"button","value":"properties","onclick":"datastructure_teacher.element.createPropertiesView(this.parentNode.parentNode)"})}));
			
			// chapter name
			chapterHeaderElement.appendChild(helpers.special.attributeContainer({"className":"chapterName","name":"Chapter-Name: ","value":helpers.elements.input({"type":"text","value":attributeValues.name || "Chapter-Name"})}));
			
			// exam name
			chapterHeaderElement.appendChild(helpers.special.attributeContainer({"className":"chapterExamName","name":"Exam-Name: ","value":document.createTextNode(attributeValues.exam || "Exam-Name")}));
			
			// work time
			chapterHeaderElement.appendChild(helpers.special.attributeContainer({"className":"chapterWorkTime","name":"Work-Time: ","value":helpers.elements.input({"type":"text","value":attributeValues.workTime || "Work-Time"})}));
			
			// create sub-chapter
			chapterHeaderElement.appendChild(element.createInsert(chapterClassName,[formattingContainer.getClass()]));
			
			// create formatting-container
			chapterHeaderElement.appendChild(element.createInsert(formattingContainer.getClass(),[chapterClassName]));
			
			// remove chapter
			chapterHeaderElement.appendChild(element.createRemove());
			
			// upload files
			chapterHeaderElement.appendChild(helpers.special.attributeContainer({"value":helpers.elements.input({"type":"file","value":"upload file","onchange":"serverCommunication.uploadFile(this)","multiple":true})}));
			
			// content visibility
			chapterHeaderElement.appendChild(contentVisibility.create());
			
			chapterElement.appendChild(chapterHeaderElement);
			element.setPropertiesVisibility(chapterHeaderElement);
			
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
				if(i === 0){
					contentElement.appendChild(dragAndDrop.createDropableSpace(chapterClassName + " " + formattingContainer.getClass()));
				}
				var childElement;
				if(childObjects[i].type === "chapter"){
					childElement = dom_getChapterElement(childObjects[i]);
				}else{
					childElement = formattingContainer.toDOM(childObjects[i]);
				}
				contentElement.appendChild(childElement);
				contentElement.appendChild(dragAndDrop.createDropableSpace(chapterClassName + " " + formattingContainer.getClass()));
			}
			// chapterElement.appendChild(contentElement);
			
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
					case "chapterName" : chapterObject.name = chapterHeaderElement.childNodes[1].childNodes[0].value; break;
					case "chapterExamName" : chapterObject.lecture = chapterHeaderElement.childNodes[1].childNodes[0].value; break;
					case "chapterWorkTime" : chapterObject.workTime = chapterHeaderElement.childNodes[1].childNodes[0].value; break;
				}
			}
			
			var childElements = element.childNodes[1].childNodes;
			for(var i = 1; i < childElements.length; i+=2){
				var childObject;
				if(childElements[i].getAttribute("class") === chapterClassName){
					childObject = json_getChapterObject(childElements[i]);
				}else{
					childObject = formattingContainer.toJSON(childElements[i]);
				}
				chapterObject.content.push(childObject);
			}
			
			return chapterObject;
		}
		
		return {
			"getClass":getChapterClassName
			,"create":createChapterElement
			,"toDOM":dom_getChapterElement
			,"toJSON":json_getChapterObject
		};
	}();




	/**
	 * #########################################################################################
	 * Formatting-Container:
	 */
	var formattingContainer = function(){
		
		var formattingContainerClassName = "formattingContainer";
		function getFormattingContainerClassName(){
			return formattingContainerClassName;
		}
		
		var idValue = 1;
		
		function createFormattingContainerElement(properties){
			
			properties = properties || {"callbackCreate":currentCallbackCreate,"callbackSave":currentCallbackSave};
			
			var id = idValue++;
			
			var formattingContainerElement = document.createElement("div");
			formattingContainerElement.setAttribute("class",formattingContainerClassName);
			
			// head
			var containerHead = document.createElement("div");
			dragAndDrop.createDragableFunctionality(containerHead);
			containerHead.appendChild(helpers.special.attributeContainer({"value":document.createTextNode("Formatting Container")}));
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
				,"callbackCreate":currentCallbackCreate
				,"callbackSave":currentCallbackSave
				});
		}

		function json_getFormattingContainerObject(element){
			
			var formattingContainerObject = jsonObjectFactory.create("formattingContainer");
			
			formattingContainerObject.content = element.childNodes[1].innerHTML;
			
			return formattingContainerObject;
		}
		
		var currentCallbackCreate = callbackCreate;
		var currentCallbackSave = callbackSave;
		
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
		
		function setCallbackCreate(callback){
			currentCallbackCreate = callback;
		}
		
		function setCallbackSave(callback){
			currentCallbackSave = callback;
		}
		
		return {
			"getClass":getFormattingContainerClassName
			,"create":createFormattingContainerElement
			,"toDOM":dom_getFormattingContainerElement
			,"toJSON":json_getFormattingContainerObject
			,"setCallbackCreate":setCallbackCreate
			,"setCallbackSave":setCallbackSave
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
		
		function getInsertInput(elementClassName,otherClassNames){
			
			var elementName = null;
			switch(elementClassName){
				case "exam" : elementName = "Exam"; break;
				case "topic" : elementName = "Topic"; break;
				case "chapter" : elementName = "Chapter"; break;
				case "exercise" : elementName = "Exercise"; break;
				case "formattingContainer" : elementName = "Formatting Container"; break;
				default : return;
			}
			
			if(otherClassNames){
				otherClassNames = "['" + otherClassNames.join("','") + "']";
			}
			
			return helpers.special.attributeContainer({"value":helpers.elements.input({"type":"button","value":"create " + elementName,"onclick":"datastructure_teacher.element.insert(this.parentNode.parentNode.parentNode,'" + elementClassName + "'," + otherClassNames + ")"})}); // .replace(/\s/g,'').toLowerCase()
		}
		
		function getRemoveInput(){
			
			return helpers.special.attributeContainer({"value":helpers.elements.input({"type":"button","value":"X","onclick":"datastructure_teacher.element.remove(this.parentNode.parentNode.parentNode)"})});
		}
		
		function insertElement(element,childClassName,otherClassNames){
			
			var contentElement = element.childNodes[1];
			
			var childElementClassNames = otherClassNames ? (childClassName + " " + otherClassNames.join(" ")) : childClassName;
			
			if(!contentElement.hasChildNodes()){
				contentElement.appendChild(dragAndDrop.createDropableSpace(childElementClassNames));
			}
			
			var childElement = null;
			switch(childClassName){
				case "exam" : childElement = exam.create(); break;
				case "topic" : childElement = topic.create(); break;
				case "chapter" : childElement = chapter.create(); break;
				case "exercise" : childElement = exercise.create(); break;
				case "formattingContainer" : childElement = formattingContainer.create(); break;
				default : return;
			}
			
			contentElement.appendChild(childElement);
			
			// test
			// alert(childClassName + "  " + otherClassNames);
			// alert(otherClassNames ? (childClassName + " " + otherClassNames.join(" ")) : childClassName);
			
			contentElement.appendChild(dragAndDrop.createDropableSpace(childElementClassNames));
		}
		
		function removeElement(element){
			
			var parent = element.parentNode;
			
			if(parent.childNodes.length === 3){
				parent.removeChild(element.previousSibling);
			}
			
			parent.removeChild(element.nextSibling);
			parent.removeChild(element);
		}
		
		function setPropertyElementsVisibility(headerElement){
			
			var propertyElements = xPath.getNodes({"node":headerElement,"expression":"*[@class]"});
			for(var i = 0; i < propertyElements.length; i++){
				propertyElements[i].style.display = "none";
			}
		}
		
		var headerId = 0;
		
		function createPropertiesView(headerElement){
			
			if(!headerElement.getAttribute("id")){
				headerElement.setAttribute("id","currentHeader_" + headerId++);
			}
			
			var divElement = document.createElement("div");
			divElement.setAttribute("id","propertiesView");
			var tableElement = document.createElement("table");
			
			var propertyElements = xPath.getNodes({"node":headerElement,"expression":"*[@class]"});
			for(var i = 0; i < propertyElements.length; i++){
				
				var trElement = document.createElement("tr");
				
				var tdElement1 = document.createElement("td");
				tdElement1.appendChild(propertyElements[i].childNodes[0].childNodes[0]);
				trElement.appendChild(tdElement1);
				
				var tdElement2 = document.createElement("td");
				tdElement2.appendChild(propertyElements[i].childNodes[1].childNodes[0]);
				trElement.appendChild(tdElement2);
				
				tableElement.appendChild(trElement);
			}
			
			divElement.appendChild(tableElement);
			divElement.appendChild(helpers.elements.input({"type":"button","value":"save","onclick":"datastructure_teacher.element.closePropertiesView('" + headerElement.getAttribute("id") + "', this.parentNode)"}));
			
			currentCallbackCreate(divElement);
		}
		
		var currentCallbackCreate = callbackCreate;
		var currentCallbackClose = callbackClose;
		
		function callbackCreate(divElement){}
		
		function setCallbackCreate(callback){
			currentCallbackCreate = callback;
		}
		
		function callbackClose(){}
		
		function setCallbackClose(callback){
			currentCallbackClose = callback;
		}
		
		function closePropertiesView(headerId,viewElement){
			
			var headerElement = document.getElementById(headerId);
			
			var propertyElements = xPath.getNodes({"node":headerElement,"expression":"*[@class]"});
			var trElements = viewElement.childNodes[0].childNodes;
			
			for(var i = 0; i < trElements.length; i++){
				
				var nameField = propertyElements[i].childNodes[0];
				var valueField = propertyElements[i].childNodes[1];
				
				nameField.appendChild(trElements[i].childNodes[0].childNodes[0]);
				valueField.appendChild(trElements[i].childNodes[1].childNodes[0]);
			}
			
			viewElement.parentNode.removeChild(viewElement);
			
			headerElement.removeAttribute("id");
			
			currentCallbackClose();
		}
		
		// name connection
		
		function setNameConnectionFunctionality(inputElement,withCallback){
			
			inputElement.setAttribute("onchange","datastructure_teacher.element.nameConnection(this,this.value," + withCallback + ")");
		}
		
		function nameConnection(element,name,withCallback){
			// alert(element.parentNode.parentNode.parentNode.firstChild.firstChild);
			// element.parentNode.parentNode.parentNode.firstChild.firstChild.nodeValue = name;
			
			if(withCallback){
				currentNameConnectionCallback(name);
			}
		}
		
		var currentNameConnectionCallback = nameConnectionCallback;
		
		function nameConnectionCallback(name){}
		
		function setNameConnectionCallback(callback){
			currentNameConnectionCallback = callback;
		}
		
		return {
			"createInsert":getInsertInput
			,"createRemove":getRemoveInput
			,"insert":insertElement
			,"remove":removeElement
			,"setPropertiesVisibility":setPropertyElementsVisibility
			,"createPropertiesView":createPropertiesView
			,"closePropertiesView":closePropertiesView
			,"setCallbackCreate":setCallbackCreate
			,"setCallbackClose":setCallbackClose
			,"setNameConnectionFunctionality":setNameConnectionFunctionality
			,"nameConnection":nameConnection
			,"setNameConnectionCallback":setNameConnectionCallback
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
		
		function createDragableFunctionality(element){
			
			element.setAttribute("draggable","true");
			element.setAttribute("ondragstart","datastructure_teacher.dragAndDrop.dragStart(event)");
			element.setAttribute("ondragend","datastructure_teacher.dragAndDrop.dragEnd(event)");
		}
		
		var dropableSpaceElementClass = "dropableSpaceElementInactive";
		
		function getDropableSpaceElementClasses(elementClass,dropable){
			
			var dropableSpaceElementClasses = "";
			if(dropable){
				dropableSpaceElementClasses = dropableSpaceElementClass;
			}
			var elementClasses = elementClass.split(" ");
			for(var i = 0; i < elementClasses.length; i++){
				dropableSpaceElementClasses += (" " + dropableSpaceElementClass + elementClasses[i]);
			}
			//alert(dropableSpaceElementClasses);
			return dropableSpaceElementClasses;
		}
		
		function changeDropableSpaceElementStyle(elements,type){
			// 
			if(type === "start"){
				for(var i = 0; i < elements.length; i++){
					elements[i].setAttribute("class","dropableSpaceElementActive");
					//alert(element.getAttribute("class"));
				}
			}else if(type === "end"){
				for(var i = 0; i < elements.length; i++){
					elements[i].setAttribute("class",dropableSpaceElementGroupClass[i]);
				}
			}
		}
		
		function createDropableSpaceFunctionality(element,className,dropableSpaceElement){
			
			if(dropableSpaceElement){
				element.setAttribute("class",getDropableSpaceElementClasses(className,true));
			}else{
				// element.setAttribute("class",getDropableSpaceElementClasses(className,false));
				
			}
			element.setAttribute("ondragover","datastructure_teacher.dragAndDrop.allowDrop(event,this)");
			element.setAttribute("ondragleave","datastructure_teacher.dragAndDrop.leaveDrop(event,this)");
			element.setAttribute("ondrop","datastructure_teacher.dragAndDrop.drop(event,this)");
		}
		
		function createDropableSpaceElement(elementClassName){
			
			var draggableDiv = document.createElement("div");
			
			createDropableSpaceFunctionality(draggableDiv,elementClassName,true);
			// draggableDiv.setAttribute("class",elementName || "chapter");
			return draggableDiv;
		}
		
		var dropableSpaceElementGroup;
		var dropableSpaceElementGroupClass;
		var dragElement;
		
		function dragStart(event){
			
			dragElement = event.target.parentNode;
			var dragElementId = "draggedElement";
			dragElement.setAttribute("id",dragElementId);
			event.dataTransfer.setData("text/plain",dragElementId);
			
			var dragElementClass = dragElement.getAttribute("class");
			
			var elementGroupClass = getDropableSpaceElementClasses(dragElementClass,false);
			dropableSpaceElementGroup = xPath.getNodes({"node":document.getElementById("activeExamElement"),"expression":"//*[contains(@class,'" + elementGroupClass + "') and not(ancestor::*[contains(@id,'" + dragElementId + "')])]"});
			//  and not(next-sibling::*[contains(@id,'" + dragElementId + "')]) and not(previous-sibling::*[contains(@id,'" + dragElementId + "')])
			
			dropableSpaceElementGroupClass = [];
			for(var i = 0; i < dropableSpaceElementGroup.length; i++){
				dropableSpaceElementGroupClass.push(dropableSpaceElementGroup[i].getAttribute("class"));
			}
			changeDropableSpaceElementStyle(dropableSpaceElementGroup,"start");
			
			// alert(dropableSpaceElementGroupClass);
			// alert(dropableSpaceElementGroup.length);
			// alert(querySelectorAll("." + dropableSpaceElementGroupClass).length);
		}
		
		function dragEnd(event){
			
			if(dragElement){
				
				changeDropableSpaceElementStyle(dropableSpaceElementGroup,"end");
				dragElement.removeAttribute("id");
				dragElement = null;
				/*if(event.dataTransfer.getData("text/plain")){
					event.dataTransfer.clearData("text/plain");
				}*/
			}
		}
		
		function allowDrop(event,element){
			
			// var id = event.dataTransfer.getData("text/plain");
			// document.getElementById(id)
			if(!(dragElement === element) && !dragElement.contains(element)){
				
				if(element.getAttribute("class") === "dropableSpaceElementActive"){
					if(!element.getAttribute("id")){
						element.setAttribute("id","dropableSpaceElementReady");
					}
					event.preventDefault();
				}else{
					var dragElementClass = dragElement.getAttribute("class");
					// alert(element.getAttribute("class"));
					switch(element.getAttribute("class")){
						case "topicContentHeader" :
							if(dragElementClass === "chapter"){
								if(!element.getAttribute("id")){
									element.setAttribute("id","dropableSpaceHeaderReady");
								}
								event.preventDefault();
							} break;
						case "topicExercisesHeader" :
							if(dragElementClass === "exercise"){
								if(!element.getAttribute("id")){
									element.setAttribute("id","dropableSpaceHeaderReady");
								}
								event.preventDefault();
							} break;
						case "chapterHeader" :
							if(dragElementClass === "chapter" || dragElementClass === "formattingContainer"){
								if(!element.getAttribute("id")){
									element.setAttribute("id","dropableSpaceHeaderReady");
								}
								event.preventDefault();
							} break;
						case "exerciseQuestionHeader" :
						case "exerciseSolutionHeader" :
							if(dragElementClass === "formattingContainer"){
								if(!element.getAttribute("id")){
									element.setAttribute("id","dropableSpaceHeaderReady");
								}
								event.preventDefault();
							} break;
					}
				}
			}
		}
		
		function leaveDrop(event,element){
			element.removeAttribute("id");
		}
		
		function drop(event,element){
			event.preventDefault();
			
			var parent = dragElement.parentNode;
			// var dragElement = document.getElementById(event.dataTransfer.getData("text/plain"));
			changeDropableSpaceElementStyle(dropableSpaceElementGroup,"end");
			element.removeAttribute("id");
			// element.parentNode.insertBefore(createDropableSpaceElement(),element);
			if(dragElement.previousSibling != element){
				// if(dragElement.previousSibling.parentNode.parentNode.getAttribute("class") === "")
				
				if(element.getAttribute("class").includes("dropableSpaceElementInactive")){
					
					dragElement.previousSibling.setAttribute("class",element.getAttribute("class"));
					element.parentNode.insertBefore(dragElement.previousSibling,element);
					element.parentNode.insertBefore(dragElement,element);
				}else{
					var elementContent = element.parentNode.childNodes[1];
					var dropableSpaceElementClasses;
					
					switch(element.getAttribute("class")){
						case "topicContentHeader" :
							dropableSpaceElementClasses = chapter.getClass(); break;
						case "topicExercisesHeader" :
							dropableSpaceElementClasses = exercise.getClass(); break;
						case "chapterHeader" :
							dropableSpaceElementClasses = (chapter.getClass() + " " + formattingContainer.getClass()); break;
						case "exerciseQuestionHeader" :
						case "exerciseSolutionHeader" :
							dropableSpaceElementClasses = formattingContainer.getClass(); break;
					}
					
					dragElement.previousSibling.setAttribute("class",getDropableSpaceElementClasses(dropableSpaceElementClasses,true));
					
					if(elementContent.hasChildNodes()){
						
						var dropableSpaceElement = dragElement.previousSibling;
						
						elementContent.appendChild(dragElement);
						elementContent.appendChild(dropableSpaceElement);
					}else{
						elementContent.appendChild(dragElement.previousSibling);
						elementContent.appendChild(dragElement);
						elementContent.appendChild(createDropableSpaceElement(dropableSpaceElementClasses));
					}
				}
			}
			dragElement.removeAttribute("id");
			dragElement = null;
			
			if(parent.childNodes.length === 1){
				parent.removeChild(parent.firstChild);
			}
			// dragElement.parentNode.removeChild(dragElement.nextSibling);
			// element.childNodes[1].appendChild(document.getElementById(event.dataTransfer.getData("text/plain")));
			/*if(event.dataTransfer.getData("text/plain")){
				event.dataTransfer.clearData("text/plain");
			}*/
		}
		
		return {
			"createDragableFunctionality":createDragableFunctionality
			,"createDropableSpaceFunctionality":createDropableSpaceFunctionality
			,"createDropableSpace":createDropableSpaceElement
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