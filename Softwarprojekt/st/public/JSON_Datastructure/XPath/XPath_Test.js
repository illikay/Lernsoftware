/**
 * 
 */

window.onload = function(){
	
	var containerElement = document.getElementById("domContainer");
	var examElement = createExamElement({});
	
	var nodes = xPath({"node":examElement,"expression":"//*[@class]"});
	
	for(var i = 0; i < nodes.length; i++){
		
		var divElement = document.createElement("div");
		divElement.appendChild(nodes[i]);
		containerElement.appendChild(divElement);
	}
}