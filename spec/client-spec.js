var app = require("../EchoClientServer");

describe('jasmine-node', function(){
	it("should respond with 'Hello' on default port quietly", function(){
		app.server.start({quiet: true});

		app.client.listen( function(data){ 
			expect(data).toBe("Hello");
			app.server.close();
		});
		app.client.send("Hello", {});
	});

	it("should respond with 'World' on port 3001 quietly", function(){
		app.server.start({port:3001, quiet: true});

		app.client.listen( function(data){ 
			expect(data).toBe("World");
			app.server.close();
		});
		app.client.send("World", {port:3001});
	});
});