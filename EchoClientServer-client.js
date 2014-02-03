var app = require("./EchoClientServer");

var messageInput = new RegExp("-");
var message = "Hello World!";
var options = {};
options["port"] = app.util.getARGVs( process.argv, ['-p', '--port'], 'number');
options["timer"] = app.util.getARGVs( process.argv, ['-t', '--timestamp'], 'bool');

if( process.argv.length >= 3 && !messageInput.test( process.argv[2] ) ){
	message = process.argv[2];
} 

function listener( msg ){
	console.log( "Received MSG: "+ msg );
}

app.client.listen( listener) ;
app.client.send( message, options );