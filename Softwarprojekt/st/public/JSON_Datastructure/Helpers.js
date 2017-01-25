/**
 * Functions for making circumstantially iterative code.
 * 
 * Helps for better readable code, less expendable writing and less possibility to make failures.
 */

var helpers = function(){
	
	var elements = function(){
		
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
		
		return {
			"input":getInputElement
			,"script":getScriptElement
		};
	}();
	
	var jsObject = function(){
		
		function getObjectString(object){
			
			var objectString = "";
			
			if(Object.prototype.toString.call(object) === "[object Object]"){
				
				objectString = objectString.concat("{");
				for(var key in object){
					objectString = objectString.concat("'",key,"':");
					
					switch(typeof object[key]){
						case "string" : objectString = objectString.concat("'",object[key],"',"); break;
						case "object" : objectString = objectString.concat(getObjectString(object[key]),","); break;
						default : objectString = objectString.concat(object[key],","); break;
					}
				}
				objectString = objectString.substring(0,objectString.length-1).concat("}");
			}else{
				objectString = objectString.concat("[");
				if(object.length > 0){
					for(var i = 0; i < object.length; i++){
						var contentValue = object[i];
						switch(typeof contentValue){
							case "string" : objectString = objectString.concat("'",contentValue,"'"); break;
							case "object" : objectString = objectString.concat(getObjectString(contentValue)); break;
							default : objectString = objectString.concat(contentValue); break;
						}
						if(i < object.length-1){
							objectString = objectString.concat(",");
						}
					}
				}
				objectString = objectString.concat("]");
			}
			
			return objectString;
		}
		
		return {
			"stringify":getObjectString
		};
	}();
	
	var special = function(){
		
		function getAttributeContainerElement(properties){
			
			var containerElement = document.createElement("span");
			
			if(properties.id){
				containerElement.setAttribute("id",properties.id);
			}
			
			if(properties.className){
				containerElement.setAttribute("class",properties.className);
			}
			
			if(properties.name && properties.value){
				
				var nameElement = document.createElement("span");
				nameElement.appendChild(document.createTextNode(properties.name));
				containerElement.appendChild(nameElement);
				
				var valueElement = document.createElement("span");
				valueElement.appendChild(properties.value);
				containerElement.appendChild(valueElement);
			}else{
				containerElement.appendChild(properties.value);
			}
			
			return containerElement;
		}
		
		return {
			"attributeContainer":getAttributeContainerElement
		};
	}();
	
	return {
		"elements":elements
		,"jsObject":jsObject
		,"special":special
	};
}();