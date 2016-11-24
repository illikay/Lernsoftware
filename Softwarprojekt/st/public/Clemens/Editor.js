
// Div-Objekte

function createLecture(){
	var LectureDiv = document.createElement("div");
	LectureDiv.setAttribute("class","lecture");
	LectureDiv.setAttribute("id","lecture");
	LectureDiv.innerHTML="Fach <br>";
	document.getElementById("lehrplan").appendChild(LectureDiv);
	
}
function createTopic(element){
	var TopicDiv = document.createElement("div");
	TopicDiv.setAttribute("class","Topic");
	TopicDiv.innerHTML="Thema";
	element.appendChild(TopicDiv);
}
//var LectureDiv = document.createElement("div");
//	LectureDiv.setAttribute("class","lecture");
//	LectureDiv.setAttribute("id","lecture");
//	LectureDiv.innerHTML="Fach <br>";
	
//var TopicDiv = document.createElement("div");
//	TopicDiv.setAttribute("class","Topic");
//	TopicDiv.innerHTML="Thema";
