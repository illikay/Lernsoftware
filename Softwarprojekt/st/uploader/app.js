module.exports = function(app) {
	var multer = require('multer');
	var upload = multer({ dest: __dirname + '/uploadedFiles'});
	
	app.post("/api/upload" , upload.single('myFile') , uploadImage);
	
	function uploadImage(req,res){
		
		var widgetId = req.body.widgetId;
		var width = req.body.width;
		var myFile = req.file;
		
		var filename = myFile.filename;
		var path = myFile.path;
		var destination = myFile.destination;
		var size= myFile.size;
		var mimetype = myFile.mimetype;
		
		res.send(myFile);
		
	}
	
	
}