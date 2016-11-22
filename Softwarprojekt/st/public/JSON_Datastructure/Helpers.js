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
	
	return inputElement;
}