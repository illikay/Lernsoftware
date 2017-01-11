/**
 * Provides functionality for xPath operations.
 */

var xPath = function(){
	
	/*
	 * Parameter = JSON-Object:
	 *  - .doc			not required
	 *  - .node
	 *  - .expression
	 */
	function getNodes(properties){
		
		var nodeSet;
		var docNode = properties.doc || document;
		
		if(docNode.evaluate){
			
			nodeSet = [];
			
			// nodes -> XPathResult - Object
			var nodes = docNode.evaluate(properties.expression,properties.node,null,XPathResult.ANY_TYPE,null);
			var node = nodes.iterateNext();
			while(node){
				nodeSet.push(node);
				node = nodes.iterateNext();
			}
			
		}else if(window.ActiveXObject){
			
			docNode.setProperty("SelectionLanguage", "XPath");
			nodeSet = docNode.selectNodes(properties.expression);
		}
		
		return nodeSet;
	}
	
	return {
		"getNodes":getNodes
	};
}();