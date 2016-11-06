var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BenutzerSchema = new Schema({
	
		
	
	Benutzername: String,
	EMailAdresse: String,
	Passwort : String
	
	
});

BenutzerSchema.statics = {
		load: function(id, cb){
			
			this.findOne({_id : id}).exec(cb);
		}
		
		
} ;

mongoose.model('Benutzer', BenutzerSchema);