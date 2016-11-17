/**
 * Provide functionality of the html page
 */

function fillOutputContainer(){
	//var text = '{"name":"The Hello World Example","author":"Tom","date":"2017","content":[], "addElement":"function(element){this.content.push(element);}"}'
	var container = document.getElementById("outputContainer");
	
	// Erzeugen eines Objekts mit new
	var chapter = new Chapter("Introduction","Olaf","2017");
	chapter.name = "2. Algebra";
	chapter.content.push({"type":"formattingContainer"});
	
	
	
	// JSON-String in Javascript-Objekt umwandeln
	var text = '{"name":"The Hello World Example","author":"Tom","date":"2017","content":[]}';
	//var chapter = JSON.parse(text);
	
	
	
	// JSON-Objekt in JSON-String umwandeln  || Funktionen werden nicht übernommen.
	container.appendChild(document.createTextNode(JSON.stringify(chapter)));
	
	
	container.appendChild(getViewOfObject(chapter));
}

//Loop over all Properties of an JSON-Object
function getViewOfObject(object){
	
	var containerElement = document.createElement("div");
	var tableElement = document.createElement("table");
	
	for(property in object){ // for each
		if(object.hasOwnProperty(property)){ // object has given key? true false
			var row = document.createElement("tr");
			var columnKey = document.createElement("td");
			columnKey.style.width = "77px";
			var columnValue = document.createElement("td");
			columnValue.style.width = "77px";
			
			columnKey.appendChild(document.createTextNode(property)); // key
			columnValue.appendChild(document.createTextNode(object[property])); // value of given key
			
			row.appendChild(columnKey);
			row.appendChild(columnValue);
			
			tableElement.appendChild(row);
		}
	}
	
	return containerElement.appendChild(tableElement);
}