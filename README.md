EchoServerApp
=============

This is a Node.js exercise to create an echo server and client. The client and server ports are configured by individual discretion, or the default 3000 can be used. The client and server communicate via socket connections. Further details about the module are:

* EchoClientServer.js is a valid Node.js module
* Asynchronous, Non-blocking IO
* TCP Server handles Socket Connected Clients

#Installation
```shell
npm install EchoClientServer
```
#Code Usage

##Server
```javascript
var app = require("./EchoClientServer"),
	options = {
		port: 3000,
		quiet: true
	};
app.server.start( options );
```
##Client
```javascript
var app = require("./EchoClientServer"),
	options = {
		port: 3000,
		timer: true
	};

function listener( msg ){
	console.log( "Received MSG: "+ msg );
}

app.client.listen( listener) ;
app.client.send( "HELLO WORLD", options );
```

#Sample Client and Server
Be sure to start the server first before the client. Also, note that both the ports, of client and server, need to the same.

## EchoClientServer-server.js
The following command starts the server at port (-p) 3005 and listens quietly (-q) for socket connections. 
```shell
node EchoClientServer-server.js -q -p 3005
```
## EchoClientServer-client.js
The following command begins the client connection at port (-p) 3005 and measures time (-t) in ms from connection until message is received. In addition, the message sent to the server is "Hello World!"
```shell
node EchoClientServer-client.js "Hello World!" -t -p 3005
```

#TESTING
##Jasmine-Node (Behavior-Driven Development)
The EchoClientServer module has been tested with Jasmine (jasmine-node). Two test cases were conducted, one to test using the default port and the other test using a custom port. For each of these tests we start and stop the server, in addition to also creating and destroying a socket connection. The server is closed once we process the data received by the client and the client's socket connection is destroyed right after the custom function handles the response.

```shell
jasmine-node spec

Finished in 0.009 seconds
2 tests, 0 assertions, 0 failures, 0 skipped
```

#Bonus
* Server and Client are accessible from one module and can be included into any other Node.js app
* Ports are optional and configurable
* The serves has quiet capability, which means it does not print any output on connection
* The time can be computer on the client to determine how long it takes to receive the echo from server
