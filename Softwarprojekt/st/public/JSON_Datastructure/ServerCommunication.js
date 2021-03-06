/**
 * Methods for requests to server and working with response.
 */

var serverCommunication = function(){
	
	function uploadExam(examJSONString,examId){
		
		var dataObject = {"ExamId" : examId , "JsonText" : examJSONString};
		var data = JSON.stringify(dataObject);
		
		let request = new XMLHttpRequest();
		request.onload = () => {
			if (request.status === 200){
				console.log('Daten erfolgreich gesendet');				
			}		
		};
		request.open('POST' , '/exam');
		request.setRequestHeader('Content-Type' , 'application/json');
		request.send(data);		

		alert("Exam-JSON-String:\n\n" + examJSONString + "\n\n\n\nExam-Id:\n\n" + examId);
		
		
		
	}
	
	
	/*
	 * File Uploading
	 */
	function uploadFile(element){
		
		
		
		var data = element.files[0];
		console.log(data);		
		
		let request = new XMLHttpRequest();
		request.onload = () => {
			if (request.status === 200){
				console.log('Datei erfolgreich gesendet');				
			}		
		};
		request.open('POST' , '/api/upload');
		var formData = new FormData();
    	formData.append("myFile",element.files[0], element.files[0].filename);
		request.send(formData);		
		alert('Anhang auf Server hochgeladen');
	   
	}
	
function uploadFile2(element){
	    
	    if('files' in element){
	        if(element.files.length == 0){
	            //txt = "Select one or more files.";
	        }else{
	        	//alert(element.hasOwnProperty("files"));

	            sendData("POST", "api/upload", element.files, uploadFileCallback, {"element":element});

	        	var formData = new FormData();
	        	formData.append("Filedata",element.files[0]);
	            sendData("POST", "api/upload", "multipart/form-data", formData, uploadFileCallback, {"element":element});

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
	function sendData(method,url,enctype,files,callback,appendix){
		
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
	    // xmlhttp.setRequestHeader(enctype);
	    xmlhttp.send({"files":files});
	}
	
function doRequest(method,url,data, callback, appendix){
		
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
	    // xmlhttp.setRequestHeader(enctype);
	    xmlhttp.send(data);
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
	
	return {
		"uploadFile":uploadFile
		,"uploadExam":uploadExam
	};
}();