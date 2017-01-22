/**
 * 
 */

var teacherPage = function(){
	
	var exams = [];
	
	function createExam(){
		
		var exam = {};
		
		var examElement = datastructure_teacher.exam.create();
		var examName;
		var examHeaderInfos = examElement.childNodes[0].childNodes;
		for(var i = 0; i < examHeaderInfos.length; i++){
			if(examHeaderInfos[i].getAttribute("class") === "examName"){
				
				var examNameInputElement = examHeaderInfos[i].childNodes[1].childNodes[0];
				examNameInputElement.setAttribute("onchange","teacherPage.changeExamName(this.value)");
				
				var listElement = document.createElement("li");
				listElement.setAttribute("onclick","teacherPage.showExam(this)");
				listElement.appendChild(document.createTextNode(examNameInputElement.value));
				document.getElementById("examList").appendChild(listElement);
				
				exam.list = listElement;
				break;
			}
		}
		
		exam.element = examElement;
		exams.push(exam);
	}
	
	var selectedListElement = null;
	function removeExam(){
		
		if(selectedListElement != null){
			
			selectedListElement.parentNode.removeChild(selectedListElement);
			
			var examsIndex = getExamsIndex({"key":"list","value":selectedListElement});
			var examElement = exams[examsIndex].element;
			examElement.parentNode.removeChild(examElement);
			exams.splice(examsIndex,1);
			
			selectedListElement = null;
		}
	}
	
	function showExamElement(listElement){
		
		if(selectedListElement != null){
			selectedListElement.removeAttribute("id");
		}
		listElement.setAttribute("id","selectedElement");
		selectedListElement = listElement;
		
		var middleElement = document.getElementById("middle");
		while(middleElement.firstChild){
			middleElement.removeChild(middleElement.firstChild);
		}
		
		middleElement.appendChild(exams[getExamsIndex({"key":"list","value":listElement})].element);
	}
	
	function saveExam(){
		
		if(selectedListElement != null){
			
			var examsIndex = getExamsIndex({"key":"list","value":selectedListElement});
			var examElement = exams[examsIndex].element;
			
			var examJSONString = JSON.stringify(datastructure_teacher.toJSON(examElement));
			
			serverCommunication.uploadExam(examJSONString,examElement.getAttribute("id"));
		}
	}
	
	function loadExam(){
		
	}
	
	function changeExamName(name){
		
		selectedListElement.childNodes[0].nodeValue = name;
	}
	
	function getExamsIndex(parameter){
		
		if(parameter){
			
			for(var i = 0; i < exams.length; i++){
				
				if((parameter.key === "list" && exams[i].list == parameter.value) || (parameter.key === "list"  && exams[i].element == parameter.value)){
					return i;
				}
			}
		}
	}
	
	function propertiesViewCallbackCreate(propertiesView){
		
		document.getElementById("middle").appendChild(propertiesView);
	}
	
	// FormattingContainer Properties
	
	function textEditorCallbackCreate(editableTextAreaElement){
		
		// var containerElement = document.getElementById("container");
		// containerElement.style.opacity = 0.03;
		
		var editorContainerElement = document.createElement("div");
		editorContainerElement.setAttribute("id","editorContainer");
		editorContainerElement.appendChild(editableTextAreaElement);
		document.getElementById("middle").appendChild(editorContainerElement);
	}

	function textEditorCallbackSave(){
		
		// var containerElement = document.getElementById("container");
		// containerElement.style.opacity = 1;
		
		document.getElementById("middle").removeChild(document.getElementById("editorContainer"));
	}
	
	function onload(){
		
		datastructure_teacher.element.setCallbackCreate(propertiesViewCallbackCreate);
		
		datastructure_teacher.formattingContainer.setCallbackCreate(textEditorCallbackCreate);
		datastructure_teacher.formattingContainer.setCallbackSave(textEditorCallbackSave);
	}
	
	return {
		"createExam":createExam
		,"showExam":showExamElement
		,"removeExam":removeExam
		,"saveExam":saveExam
		,"loadExam":loadExam
		,"changeExamName":changeExamName
		,"onload":onload
	};
}();

window.onload = teacherPage.onload;