var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//erstellt ein Schema für die Datenbank

var ExamSchema = new Schema(	 
	
	{	
		ExamId: String,
		JsonText: String		
	}
);

//erzeugt Methoden, mit denen man auf die Datenbank zugreifen kann 

ExamSchema.statics = {			
	
		
	//laden eines Eintrags anhand seiner Datenbank-Id	
	load: function(id, cb){					
		this.findOne({_id : id}).exec(cb);		 
	},
	
		//laden eines Antrags an seiner Request-Id
	loadByExamId: function(sku, cb){		
		this.findOne({ExamId : ExamId }).exec(cb);
	}
	
};

mongoose.model('Exam', ExamSchema);