var config = require('../config.js');
var twilio = require('twilio');

function tight (req, res) {
	
	var resp = new twilio.TwimlResponse();
	var x = req.body.Body.toLowerCase()

	if (x == "tight") {		
		    resp.message("Oh it be ultra tight. About as tight as this quote from Kanye West, -- Super inspired by my visit to Ikea today , really amazing company… my mind is racing with the possibilities…");
	} else if (x == "a flight of swallows") {
			resp.message("Thank you for your interest! This company isn't real yet, but if it ever becomes a reality we will be sure to reach out!!");
	} else {
		    resp.message("Sorry, I don't understand");

	} 		

			res.writeHead(200, {'Content-Type': 'text/xml'});
		    res.end(resp.toString());
}

module.exports = {
	tight : tight
}