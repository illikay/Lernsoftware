/**
 * 
 */
var containerElement;
var idCounter = 1;

// var viewContainerElement;
var editableTextAreaContainerElement;
window.onload = function(){
	
	containerElement = document.getElementById("container");
	// viewContainerElement = document.getElementById("viewContainer");
	editableTextAreaContainerElement = document.getElementById("editableTextAreaContainer");
}

function addNewFormattingContainer(){
	
	containerElement.appendChild(createFormattingContainerElement(idCounter++));
}

function createEditableTextArea(viewId,editorId){
	
	/*var contentString = "";
	if(viewContainerElement && viewContainerElement.innerHTML){
		contentString = viewContainerElement.innerHTML;
	}*/
	// alert("Import: " + contentString);
	// var editorId = "editableTextArea_" + id; // "editableTextArea"
	
	editableTextAreaContainerElement.appendChild(getEditableTextAreaElement(viewId,editorId));
	
	if(tinyMCE.get(editorId)){
		tinymce.EditorManager.execCommand('mceAddEditor',true, editorId); // TinyMCE 4
		// tinymce.EditorManager.execCommand('mceAddControl',true, editorID);
	}else{
		tinymce.init({"selector":"textarea#" + editorId});
	}
	
	var viewContainerElement = document.getElementById(viewId); // "formattingContainerView_" + id
	
	tinyMCE.get(editorId).setContent(viewContainerElement.innerHTML); // "<strong>Hallo</strong> Welt !!!"
}

function getEditableTextAreaElement(viewId,editorId){
	
	var textAreaContainer = document.createElement("div");
	
	var containerHeader = document.createElement("div");
	containerHeader.appendChild(getInputElement({"type":"button","value":"save","onclick":"saveEditableTextAreaContent('" + viewId + "','" + editorId + "')"})); // this.parentNode.nextSibling.childNodes[1].getAttribute('id')
	textAreaContainer.appendChild(containerHeader);
	
	var containerContent = document.createElement("div");
	
	var textAreaElement = document.createElement("textarea");
	textAreaElement.setAttribute("id",editorId);
	containerContent.appendChild(textAreaElement);
	
	textAreaContainer.appendChild(containerContent);

	return textAreaContainer;
}

function saveEditableTextAreaContent(viewId,editorId){
	
	var viewContainerElement = document.getElementById(viewId);
	
	while(viewContainerElement.firstChild){
		viewContainerElement.removeChild(viewContainerElement.firstChild);
	}
	
	var contentString = tinyMCE.get(editorId).getContent({"format":"raw"});
	// alert("Export: " + contentString);
	//var nodeClone = contentNode.cloneNode(true);
	viewContainerElement.innerHTML = contentString; // nodeClone
	
	tinymce.EditorManager.execCommand('mceRemoveEditor',true, editorId); // TinyMCE 4
	// tinymce.EditorManager.execCommand('mceRemoveControl',true, id);
	
	while(editableTextAreaContainerElement.firstChild){
		editableTextAreaContainerElement.removeChild(editableTextAreaContainerElement.firstChild);
	}
}