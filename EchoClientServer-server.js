var app = require("./EchoClientServer");

var options = {};

options["port"] = app.util.getARGVs( process.argv, ['-p', '--port'], 'number');
options["quiet"] = app.util.getARGVs( process.argv, ['-q', '--quiet'], 'bool');

app.server.start( options );
