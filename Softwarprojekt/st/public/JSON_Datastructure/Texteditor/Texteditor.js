/**
 * Provides functions for editing the content of an arbitrary div element:
 * Used by: FormattingContainer
 */

function createEditableTextArea(properties){
	
	properties.callbackCreate(getEditableTextAreaElement(properties));
	
	if(tinyMCE.get(properties.editorId)){
		tinymce.EditorManager.execCommand('mceAddEditor',true, properties.editorId); // TinyMCE 4
		// tinymce.EditorManager.execCommand('mceAddControl',true, editorId);
	}else{
		tinymce.init({"selector":"textarea#" + properties.editorId});
	}
	
	tinyMCE.get(properties.editorId).setContent(document.getElementById(properties.viewId).innerHTML); // "<strong>Hallo</strong> Welt !!!"
}

function getEditableTextAreaElement(properties){
	
	var textAreaContainer = document.createElement("div");
	
	var containerHeader = document.createElement("div");
	containerHeader.appendChild(getAttributeContainerElement({"value":getInputElement({"type":"button","value":"save","onclick":"saveEditableTextAreaContent(" + getObjectString(properties) + ")"})}));
	textAreaContainer.appendChild(containerHeader);
	
	var containerContent = document.createElement("div");
	
	var textAreaElement = document.createElement("textarea");
	textAreaElement.setAttribute("id",properties.editorId);
	containerContent.appendChild(textAreaElement);
	
	textAreaContainer.appendChild(containerContent);
	
	return textAreaContainer;
}

function saveEditableTextAreaContent(properties){
	
	var viewContainerElement = document.getElementById(properties.viewId);
	
	while(viewContainerElement.firstChild){
		viewContainerElement.removeChild(viewContainerElement.firstChild);
	}
	
	viewContainerElement.innerHTML = tinyMCE.get(properties.editorId).getContent({"format":"raw"});
	
	tinymce.EditorManager.execCommand('mceRemoveEditor',true, properties.editorId); // TinyMCE 4
	// tinymce.EditorManager.execCommand('mceRemoveControl',true, id);
	
	var editableTextAreaContainerElement = document.getElementById(properties.editorId).parentNode.parentNode.parentNode;
	while(editableTextAreaContainerElement.firstChild){
		editableTextAreaContainerElement.removeChild(editableTextAreaContainerElement.firstChild);
	}
	properties.callbackSave();
}