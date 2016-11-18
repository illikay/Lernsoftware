var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//erstellt ein Schema für die Datenbank

var BenutzerSchema = new Schema(	 
	
	{	
		Benutzername: String,
		EMailAdresse: String,
		Passwort : String		
	}
);

//erzeugt Methoden, mit denen man auf die Datenbank zugreifen kann 

BenutzerSchema.statics = {			
	
		
	//laden eines Eintrags anhand seiner Id	
	load: function(id, cb){					
		this.findOne({_id : id}).exec(cb);		 
	},
	
	//laden eines Antrags anhand seines Namens und seiner E-mailAdresse	--> unique
	loadByNameAndEMail: function(Benutzername, EMailAdresse , cb){		
		this.findOne({Benutzername : Benutzername, EMailAdresse : EMailAdresse }).exec(cb);
	}		
};

mongoose.model('Benutzer', BenutzerSchema);