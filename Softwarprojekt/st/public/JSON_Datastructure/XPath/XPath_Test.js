/**
 * 
 */

window.onload = function(){
	
	var containerElement = document.getElementById("domContainer");
	var examElement = datastructure_teacher.exam.create();
	
	var nodes = xPath.getNodes({"node":examElement,"expression":"//*[@class]"});
	
	for(var i = 0; i < nodes.length; i++){
		
		var divElement = document.createElement("div");
		divElement.appendChild(nodes[i]);
		containerElement.appendChild(divElement);
	}
}