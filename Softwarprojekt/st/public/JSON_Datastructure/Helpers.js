/**
 * 
 */

// create input-element
function getInputElement(properties){
	
	var inputElement = document.createElement("input");
	
	if(properties.hasOwnProperty("type")){
		inputElement.setAttribute("type",properties.type);
	}
	
	if(properties.hasOwnProperty("value")){
		inputElement.setAttribute("value",properties.value);
	}
	
	if(properties.hasOwnProperty("width")){
		inputElement.setAttribute("width",properties.width);
	}
	
	if(properties.hasOwnProperty("onclick")){
		inputElement.setAttribute("onclick",properties.onclick);
	}
	
	if(properties.hasOwnProperty("onchange")){
		inputElement.setAttribute("onchange",properties.onchange);
	}
	
	if(properties.hasOwnProperty("multiple")){
		inputElement.setAttribute("multiple",properties.multiple);
	}
	
	return inputElement;
}

function getScriptElement(properties){
	var scriptElement = document.createElement("script");
	scriptElement.setAttribute("type","text/javascript");
	scriptElement.onload = properties.onloadFunction;
	scriptElement.setAttribute("src",properties.filePath);
	return scriptElement;
}

function getContainerElement_Span(properties){
	
	var spanContainerElement = document.createElement("span");
	if(properties.id){
		spanContainerElement.setAttribute("id",properties.id);
	}
	
	if(properties.name && properties.value){
		var nameElement = document.createElement("span");
		nameElement.appendChild(document.createTextNode(properties.name));
		spanContainerElement.appendChild(nameElement);
		
		var valueElement = document.createElement("span");
		valueElement.appendChild(properties.value);
		spanContainerElement.appendChild(valueElement);
	}else{
		spanContainerElement.appendChild(properties.value);
	}
	
	return spanContainerElement;
}