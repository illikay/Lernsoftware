/**
 * Provides functions for editing the content of an arbitrary div element:
 * Used by: FormattingContainer
 */

var texteditor = function(){
	
	function createEditableTextArea(properties){
		
		properties.callbackCreate(getEditableTextAreaElement(properties));
		
		if(tinyMCE.get(properties.editorId)){
			tinymce.EditorManager.execCommand('mceAddEditor',true, properties.editorId); // TinyMCE 4
			// tinymce.EditorManager.execCommand('mceAddControl',true, editorId);
		}else{
			tinymce.init({
				"selector":"textarea#" + properties.editorId
				,"plugins":"textcolor colorpicker lists advlist table image link"
				,"tools":"inserttable tablepops deletetable cell row column"
				,"toolbar":["undo redo | styleselect formatselect | bold italic | forecolor backcolor | alignleft aligncenter alignright alignjustify"
				            ,"bullist numlist | table | image | insertfile | link unlink"]});
		}
		
		tinyMCE.get(properties.editorId).setContent(document.getElementById(properties.viewId).innerHTML); // "<strong>Hallo</strong> Welt !!!"
	}

	function getEditableTextAreaElement(properties){
		
		var textAreaContainer = document.createElement("div");
		
		var containerHeader = document.createElement("div");
		properties.save = true;
		containerHeader.appendChild(helpers.special.attributeContainer({"value":helpers.elements.input({"type":"button","value":"save","onclick":"texteditor.close(" + helpers.jsObject.stringify(properties) + ")"})}));
		properties.save = false;
		containerHeader.appendChild(helpers.special.attributeContainer({"value":helpers.elements.input({"type":"button","value":"cancel","onclick":"texteditor.close(" + helpers.jsObject.stringify(properties) + ")"})}));
		textAreaContainer.appendChild(containerHeader);
		
		var containerContent = document.createElement("div");
		
		var textAreaElement = document.createElement("textarea");
		textAreaElement.setAttribute("id",properties.editorId);
		containerContent.appendChild(textAreaElement);
		
		textAreaContainer.appendChild(containerContent);
		
		return textAreaContainer;
	}

	function closeEditableTextAreaContent(properties){
		
		if(properties.save){
			
			var viewContainerElement = document.getElementById(properties.viewId);
			while(viewContainerElement.firstChild){
				viewContainerElement.removeChild(viewContainerElement.firstChild);
			}
			viewContainerElement.innerHTML = tinyMCE.get(properties.editorId).getContent({"format":"raw"});
		}
		
		tinymce.EditorManager.execCommand('mceRemoveEditor',true, properties.editorId); // TinyMCE 4
		// tinymce.EditorManager.execCommand('mceRemoveControl',true, id);
		
		var editableTextAreaContainerElement = document.getElementById(properties.editorId).parentNode.parentNode.parentNode;
		while(editableTextAreaContainerElement.firstChild){
			editableTextAreaContainerElement.removeChild(editableTextAreaContainerElement.firstChild);
		}
		properties.callbackSave();
	}
	
	return {
		"create":createEditableTextArea
		,"close":closeEditableTextAreaContent
		};
}();