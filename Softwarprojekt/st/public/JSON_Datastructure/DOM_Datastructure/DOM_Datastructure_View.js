/**
 * Functions for supporting functionality of DOM_Datastructure_View.html file:
 */
var profile = {"name":"Max","surname":"Mustermann","password":"teacher","userType":"teacher","right":"write"};

var domElements;

window.onload = function(){
	refreshDomRepresentation();
	
	var controllerContainerContent = document.getElementById("controllerContainer_contentArea");
	
	for(element in domElements){
		controllerContainerContent.appendChild(getInputElement({"type":"button","value":element,"onclick":"createDomRepresentation('" + element + "');"}));
	}
}

function refreshDomRepresentation(){
	
	/*var headElement = document.head;
	
	var scriptElements = headElement.getElementsByTagName("script");
	var lastScriptElement = scriptElements[scriptElements.length-1];
	while(2 < scriptElements.length){
		headElement.removeChild(lastScriptElement.previousSibling);
	}
	
	refreshScriptElements(0, headElement, scriptElements);*/
	domElements = {
		 	"Exam": getDomRepresentation_Element(createExamElement({"name":"Exam-Name","lecture":"","className":"","authorName":"","authorSurname":"","date":null}))
			,"Topic": getDomRepresentation_Element(createTopicElement(profile, "Topic-Name"))
			,"Chapter": getDomRepresentation_Element(createChapterElement(profile, "Chapter-Name"))
			,"Formatting-Container": getDomRepresentation_Element(createFormattingContainerElement(profile, new FormattingContainer()))
	};
}

function refreshScriptElements(index, headElement, scriptElements){
	alert(index);
	switch(index){
		case 0 : headElement.insertBefore(getScriptElement({"filePath":"../Schoolmaterial.js","onloadFunction":refreshScriptElements(index + 1, headElement, scriptElements)}),lastScriptElement); break;
		case 1 : headElement.insertBefore(getScriptElement({"filePath":"DOM_Datastructure_Teacher.js","onloadFunction":refreshScriptElements(index + 1, headElement, scriptElements)}),lastScriptElement); break;
		case 2 : headElement.insertBefore(getScriptElement({"filePath":"DOM_Datastructure_Student.js","onloadFunction":refreshScriptElements(index + 1, headElement, scriptElements)}),lastScriptElement); break;
		case 3 : headElement.insertBefore(getScriptElement({"filePath":"../DataArchitecture.js","onloadFunction":refreshScriptElements(index + 1, headElement, scriptElements)}),lastScriptElement); break;
		case 4 : domElements = {
				 	"Exam": getDomRepresentation_Element(createExamElement({"name":"Exam-Name","lecture":"","className":"","authorName":"","authorSurname":"","date":null}))
					,"Topic": getDomRepresentation_Element(createTopicElement(profile, "Topic-Name"))
					,"Chapter": getDomRepresentation_Element(createChapterElement(profile, "Chapter-Name"))
					,"Formatting-Container": getDomRepresentation_Element(createFormattingContainerElement(profile, new FormattingContainer()))
				}; break;
	}
}

function createDomRepresentation(elementName){
	var viewContainerContent = document.getElementById("viewContainer_content");
	
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