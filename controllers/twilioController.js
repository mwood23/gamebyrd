var config = require('../config.js');
var twilio = require('twilio');

function tight (req, res) {
	

	console.log('made it to twilio', req.body, req.body.Body)
	var resp = new twilio.TwimlResponse();
	var x = req.body.Body.toLowerCase()
	console.log(x)
	

	console.log(x, resp)

	if (x == "tight") {		
			console.log('inside tight')
			
		    resp.message("Oh it be ultra tight. About as tight as this quote from Kanye West, -- Super inspired by my visit to Ikea today , really amazing company… my mind is racing with the possibilities…");
	} else {
			console.log('inside else')
		    resp.message("Sorry, I don't work dat good yet");

	} 		

			res.writeHead(200, {'Content-Type': 'text/xml'});
		    res.end(resp.toString());
}

module.exports = {
	tight : tight
}