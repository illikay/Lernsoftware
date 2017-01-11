/**
 * 
 */

window.onload = function(){
	texteditorTest.onload();
}

var texteditorTest = function(){
	
	var containerElement;

	function onload(){
		containerElement = document.getElementById("container");
	}
	
	function addNewFormattingContainer(){
		
		containerElement.appendChild(createFormattingContainerElement({"callbackCreate":callbackCreate}));
	}

	function callbackCreate(editableTextAreaElement){
		
		var editableTextAreaContainerElement = document.getElementById("editableTextAreaContainer");
		editableTextAreaContainerElement.appendChild(editableTextAreaElement);
	}
	
	return {
		"onload":onload
		,"new":addNewFormattingContainer
	};
}();