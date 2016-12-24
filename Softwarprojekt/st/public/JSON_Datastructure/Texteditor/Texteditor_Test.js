/**
 * 
 */
var containerElement;

window.onload = function(){
	
	containerElement = document.getElementById("container");
}

function addNewFormattingContainer(){
	
	containerElement.appendChild(createFormattingContainerElement({"callbackCreate":callbackCreate}));
}

function callbackCreate(editableTextAreaElement){
	
	var editableTextAreaContainerElement = document.getElementById("editableTextAreaContainer");
	editableTextAreaContainerElement.appendChild(editableTextAreaElement);
}