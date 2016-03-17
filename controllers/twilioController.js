var config = require('../config.js')
var twilio = require('twilio')(config.account_sid, config.auth_token)

function tight (req, res) {
	console.log('made it to twilio', req.body, req.body.Body)
	var x = req.body.Body.toLowerCase()
	var twiml = new twilio.TwimlResponse();

	console.log(x, twiml)

	if (x == "tight") {		
			console.log('inside tight')
		    twiml.message("Oh it be ultra tight. About as tight as this quote from Kanye West, -- Super inspired by my visit to Ikea today , really amazing company… my mind is racing with the possibilities…");
	} else {
			console.log('inside else')
		    twiml.message("Sorry, I don't work dat good yet");

	} 		

			res.writeHead(200, {'Content-Type': 'text/xml'});
		    res.end(twiml.toString());
}

module.exports = {
	tight : tight
}