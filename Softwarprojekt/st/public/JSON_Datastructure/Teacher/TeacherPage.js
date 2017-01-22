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
				var listElement = document.createElement("li");
				listElement.setAttribute("onclick","teacherPage.showExam(this)");
				listElement.appendChild(document.createTextNode(examHeaderInfos[i].childNodes[1].childNodes[0].value));
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
		
	}
	
	function loadExam(){
		
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
	
	return {
		"createExam":createExam
		,"showExam":showExamElement
		,"removeExam":removeExam
		,"saveExam":saveExam
		,"loadExam":loadExam
	};
}();