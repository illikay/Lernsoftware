/**
 * 
 */
var containerElement;
var textAreaElements = [];
var idCounter = 0;

// var viewContainerElement;
var editableTextAreaContainerElement;
window.onload = function(){
	
	containerElement = document.getElementById("container");
	// viewContainerElement = document.getElementById("viewContainer");
	editableTextAreaContainerElement = document.getElementById("editableTextAreaContainer");
	//tinymce.init({"selector":"textarea"});
}

function addNewFormattingContainer(){
	
	containerElement.appendChild(createFormattingContainerElement(idCounter++));
}

function createEditableTextArea(id){
	
	var viewContainerElement = document.getElementById("viewContainer_" + id);
	var contentNode = viewContainerElement.childNodes[0];
	
	var contentString = "";
	if(contentNode && contentNode.innerHTML){
		contentString = contentNode.innerHTML;
	}
	
	var editorID = "editableTextArea_" + id; // "editableTextArea"
	
	editableTextAreaContainerElement.appendChild(getEditableTextAreaElement(editorID,id));
	
	if(tinyMCE.get(editorID)){
		tinymce.EditorManager.execCommand('mceAddControl',true, editorID);
	}else{
		tinymce.init({"selector":"#"+editorID});
	}
	
	tinyMCE.get(editorID).setContent(contentString); // "<strong>Hallo</strong> Welt !!!"
}

function getEditableTextAreaElement(id,idNumber){
	
	var textAreaContainer = document.createElement("div");
	
	var containerHeader = document.createElement("div");
	containerHeader.appendChild(getInputElement({"type":"button","value":"save","onclick":"saveContent(this.parentNode.nextSibling.childNodes[1].getAttribute('id')," + idNumber + ")"}));
	textAreaContainer.appendChild(containerHeader);
	
	var containerContent = document.createElement("div");
	
	var textAreaElement = document.createElement("textarea");
	textAreaElement.setAttribute("id",id);
	containerContent.appendChild(textAreaElement);
	
	textAreaContainer.appendChild(containerContent);

	return textAreaContainer;
}

function saveContent(id,idNumber){
	
	
	var viewContainerElement = document.getElementById("viewContainer_" + idNumber);
	
	while(viewContainerElement.firstChild){
		viewContainerElement.removeChild(viewContainerElement.firstChild);
	}
	
	var contentString = tinyMCE.get(id).getContent({"format":"raw"});
	
	//var nodeClone = contentNode.cloneNode(true);
	viewContainerElement.innerHTML = contentString; // nodeClone
	
	tinymce.EditorManager.execCommand('mceRemoveControl',true, id);
	
	while(editableTextAreaContainerElement.firstChild){
		editableTextAreaContainerElement.removeChild(editableTextAreaContainerElement.firstChild);
	}
}