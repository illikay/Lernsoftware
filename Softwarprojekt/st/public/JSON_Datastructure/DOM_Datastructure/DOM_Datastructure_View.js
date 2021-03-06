/**
 * Functions for supporting functionality of DOM_Datastructure_View.html file:
 * 
 * Shows html syntax in a better readable view. Specifically for the datastructure elements.
 * Not directly part of the projects real functionality.
 * Only there to help the developers during their development process.
 */

var datastructureView = function(){
	
	var domElements;
	var headElement;
	var scriptElements;
	var lastScriptElement;
	var controllerContainerContent;
	var viewContainerContent;
	var initialization = true;
	
	function onload(){
		headElement = document.head;
		scriptElements = headElement.getElementsByTagName("script");
		lastScriptElement = scriptElements[scriptElements.length-1];
		controllerContainerContent = document.getElementById("controllerContainer_contentArea");
		viewContainerContent = document.getElementById("viewContainer_content");
		
		refreshDomRepresentation();
	}
	
	function refreshDomRepresentation(){
		
		while(2 < scriptElements.length){
			headElement.removeChild(lastScriptElement.previousSibling);
		}
		
		refreshScriptElements(0);
	}

	function refreshScriptElements(index){
		
		switch(index){
			case 0 : headElement.insertBefore(helpers.elements.script({"filePath":"../Schoolmaterial.js","onloadFunction":function(){refreshScriptElements(index + 1);}}),lastScriptElement); break;
			case 1 : headElement.insertBefore(helpers.elements.script({"filePath":"DOM_Datastructure_Teacher.js","onloadFunction":function(){refreshScriptElements(index + 1);}}),lastScriptElement); break;
			case 2 : headElement.insertBefore(helpers.elements.script({"filePath":"DOM_Datastructure_Student.js","onloadFunction":function(){refreshScriptElements(index + 1);}}),lastScriptElement); break;
			case 3 : headElement.insertBefore(helpers.elements.script({"filePath":"../Data_Architecture.js","onloadFunction":function(){refreshScriptElements(index + 1);}}),lastScriptElement); break;
			case 4 : 
				domElements = {
					 	"Exam": getDomRepresentation_Element(datastructure_teacher.exam.create())
						,"Topic": getDomRepresentation_Element(datastructure_teacher.topic.create())
						,"Chapter": getDomRepresentation_Element(datastructure_teacher.chapter.create())
						,"Exercise": getDomRepresentation_Element(datastructure_teacher.exercise.create())
						,"Formatting-Container": getDomRepresentation_Element(datastructure_teacher.formattingContainer.create({"callbackCreate":function(e){}}))
				};
				
				if(initialization){
					for(element in domElements){
						controllerContainerContent.appendChild(helpers.elements.input({"type":"button","value":element,"onclick":"datastructureView.representation('" + element + "');"}));
					}
					
					initialization = false;
				}
				
				break;
		}
	}

	function createDomRepresentation(elementName){
		
		while(viewContainerContent.firstChild){
			viewContainerContent.removeChild(viewContainerContent.firstChild);
		}
		
		var domRepresentationContainer = document.createElement("div");
		
		var viewContentCaption = document.createElement("span");
		viewContentCaption.setAttribute("class","viewContentCaption");
		viewContentCaption.appendChild(document.createTextNode(elementName + " :"));
		domRepresentationContainer.appendChild(viewContentCaption);
		
		domRepresentationContainer.appendChild(document.createElement("br"));
		domRepresentationContainer.appendChild(document.createElement("br"));
		domRepresentationContainer.appendChild(domElements[elementName]);
		
		viewContainerContent.appendChild(domRepresentationContainer);
	}

	function getDomRepresentation_Element(element){
		
		var elementName = element.nodeName.toLowerCase();
		
		var elementContainer = document.createElement("div");
		elementContainer.setAttribute("class","elementRepresentationContainer");
		
		var startTag = document.createElement("span");
		elementContainer.appendChild(startTag);
		
		var startTag_nameBegin = document.createElement("span");
		startTag_nameBegin.setAttribute("class","startTag");
		startTag_nameBegin.appendChild(document.createTextNode("<" + elementName));
		startTag.appendChild(startTag_nameBegin);
		
		var attributes = element.attributes;
		if(attributes){
			for(var i = 0 ; i < attributes.length; i++){
				startTag.appendChild(getAttributeRepresentationElement(attributes[i]));
			}
		}
		
		var startTag_nameEnd = document.createElement("span");
		startTag_nameEnd.setAttribute("class","startTag");
		startTag_nameEnd.appendChild(document.createTextNode(">"));
		startTag.appendChild(startTag_nameEnd);
		
		if(element.hasChildNodes()){
			
			var nodes = element.childNodes;
			for(var i = 0; i < nodes.length; i++){
				var node = nodes[i];
				var nodeType = node.nodeType;
				if(nodeType === 1){
					elementContainer.appendChild(getDomRepresentation_Element(node));
				}else if(nodeType === 3){
					elementContainer.appendChild(getDomRepresentation_Text(node));
				}
			}
		}
		
		var endTag = document.createElement("span");
		endTag.setAttribute("class","endTag");
		elementContainer.appendChild(endTag);
		
		endTag.appendChild(document.createTextNode("</" + elementName + ">"));
		
		return elementContainer;
	}

	function getDomRepresentation_Text(node){
		
		var textContainer = document.createElement("div");
		textContainer.setAttribute("class","textRepresentationContainer");
		textContainer.appendChild(document.createTextNode(node.nodeValue));
		return textContainer;
	}

	function getAttributeRepresentationElement(attribute){
		
		var attributeContainer = document.createElement("span");
		
		var attributeName = document.createElement("span");
		attributeName.setAttribute("class","attributeName");
		attributeName.appendChild(document.createTextNode(" " + attribute.nodeName));
		attributeContainer.appendChild(attributeName);
		
		attributeContainer.appendChild(document.createTextNode('="'));
		
		var attributeValue = document.createElement("span");
		attributeValue.setAttribute("class","attributeValue");
		attributeValue.appendChild(document.createTextNode(attribute.nodeValue));
		attributeContainer.appendChild(attributeValue);
		
		attributeContainer.appendChild(document.createTextNode('"'));
		
		return attributeContainer;
	}
	
	return {
		"onload":onload
		,"representation":createDomRepresentation
		,"refresh":refreshDomRepresentation
	};
}();

window.onload = datastructureView.onload;