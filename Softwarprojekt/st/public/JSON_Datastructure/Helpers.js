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