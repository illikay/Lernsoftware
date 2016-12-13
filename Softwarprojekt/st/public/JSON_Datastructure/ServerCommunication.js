/**
 * Methods for requests to server and working with response.
 */

/*
 * File Uploading
 */
function uploadFile(element){
    
    if('files' in element){
        if(element.files.length == 0){
            //txt = "Select one or more files.";
        }else{
        	//alert(element.hasOwnProperty("files"));
            sendData("POST", "serverurl", element.files, uploadFileCallback, {"element":element});
        }
    }else{
        if(x.value == ""){
            //txt += "Select one or more files.";
        }else{
            //txt += "The files property is not supported by your browser!";
            //txt  += "<br>The path of the selected file: " + x.value; // If the browser does not support the files property, it will return the path of the selected file instead. 
        }
    }
}

function uploadFileCallback(xmlhttp,object){
	
	var element = object.element;
	var jsonObject = JSON.parse(xmlhttp.responseText);
	
	var container = document.createElement("div");
	for(property in jsonObject){
		// Wie sollen die Dateien dargestellt werden?
	}
	
	var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(event){
    	var uri = event.target.result;
    	document.getElementsByTagName("img")[0].src = uri;
    }
}

/*
 * XMLHttpRequest
 */
function sendData(method,url,files,callback,appendix){
	
	var xmlhttp;
    if(window.XMLHttpRequest){
    	// code for modern browsers
        xmlhttp = new XMLHttpRequest();
     }else{
    	// code for old IE browsers
    	 xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function(){
    	if(this.readyState == 4 && this.status == 200){
            callback(this,appendix);
        }
    };
    xmlhttp.open(method,url,true);
    xmlhttp.send({"files":files});
}

/* 
 			var testJson = new Exam("exam");
            alert("hasOwnProperty(): " + testJson.hasOwnProperty("newFeature") + " | in: " + ("newFeature" in testJson));
            Exam.prototype.newFeature = "feature 1";
            alert("hasOwnProperty(): " + testJson.hasOwnProperty("newFeature") + " | in: " + ("newFeature" in testJson));
            testJson = new Exam("exam");
            alert("hasOwnProperty(): " + testJson.hasOwnProperty("newFeature") + " | in: " + ("newFeature" in testJson));
        
for(var i = 0; i < element.files.length; i++){
                txt += "<br><strong>" + (i+1) + ". file</strong><br>";
                var file = element.files[i];
                if ('name' in file) {
                    txt += "name: " + file.name + "<br>";
                }
                if ('size' in file) {
                    txt += "size: " + file.size + " bytes <br>";
                }
            }



*/