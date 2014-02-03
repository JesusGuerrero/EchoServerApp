/*
 * Echo Server & Client
 *
 */
var s = require('net');

//http://stackoverflow.com/questions/221294/how-do-you-get-a-timestamp-in-javascript
function getTimeStamp() {
    var now = new Date();
    return ((now.getMonth() + 1) + '/' +
            (now.getDate()) + '/' +
             now.getFullYear() + " " +
             now.getHours() + ':' +
             ((now.getMinutes() < 10)
                 ? ("0" + now.getMinutes())
                 : (now.getMinutes())) + ':' +
             ((now.getSeconds() < 10)
                 ? ("0" + now.getSeconds())
                 : (now.getSeconds())));
}


var util = {
	//Function parses command line parameters (argv) and checks to see if exists in array, if so returns bool, number, or string
	getARGVs: function( argv, array, type ){
		for( var i=0, l = argv.length; i < l; i+=1) {
			if( array.indexOf( argv[i]) != -1 ){
				if( type == "bool"){
					return true;
				}else {
					if( typeof argv[i+1] !== "undefined") {
						if( type == "number"){
							return parseInt( argv[i+1] );
						}else {
							return argv[i+1];
						}
					}
				}
			}
		}
		if( type == "bool"){
			return false;
		}else{
			return 0;
		}
	},
	//Function checks the port for validity and then assigns to obj property and returns true when valid, otherwise false
	setPort: function( obj, port){
		if( typeof port !== "undefined" && typeof port === 'number' && port > 0 )
		{	
			obj.port = port;
			return true;
		}
		return false;
	}
}

var serverAPI = (function(s){
	var quietLog = false,
		port = 3000,
		server,
		api;
	
	api = {
		start: function( options ) {
			//Initializes the port and quietLog flags
			var obj = {};
			if( util.setPort( obj, options["port"]) ){
				port = obj.port;
			}
			delete obj;
			quietLog = options["quiet"];
			
			//Creates the Server
			server = s.createServer( function( socket ) {
				//Inside the server handling function
				
				socket.on('data', function(data){
					//Inside the server listener function when data detected

					var log = "";
					if( !quietLog ) {
						log += "\n/********** RECEIVED **************/";
						log += "\n/ Message: " + data;
						log += "\n/ Source IP: " + socket.remoteAddress + ':' +socket.remotePort;
						log += "\n/ TimeStamp:" + getTimeStamp();
						log += "\n/***********************************/\n";
						console.log( log );
					}

					//Echo the data detected back to the client
					socket.write( data );
				});
			}).listen( port );

			return s;
		},
		close: function() {
			server.close();
		}
	};

	return api;
}(s));

var clientAPI = (function(s){
	var client = new s.Socket(),
		port = 3000,
		timer = { start: 0, end: 0, show: false },
		api;

	client.setEncoding('utf8');

	api = {
		send: function( msg, options){
			//Initializes the port and timer flags
			var obj = {};
			if( util.setPort( obj, options.port ) ) {
				port = obj.port;
			}
			if( options.timer ){

				timer.show = true;
			}
			delete obj;

			if( timer.show ){
				timer.start = new Date().getTime();
			}
			client.connect( port, 'localhost', function(){
				//Inside the succesful connection function
				client.write( msg );
			});
		},
		listen: function( fn ){
			//Inside listen we pass a function through parameter to capture custom data handling
			client.on( 'data', function(data){
				if( timer.show ){
					console.log( "Response time: "+ (new Date().getTime() - timer.start ) +"ms" );
				}
				fn( data );
				client.destroy();
			});
		}
	};

	return api;

}(s));

module.exports.util = util;
module.exports.server = serverAPI;
module.exports.client = clientAPI;