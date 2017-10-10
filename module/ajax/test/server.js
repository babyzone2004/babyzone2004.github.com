var httpServer = require('http-server');
var server = httpServer.createServer({
  root: './sample/'
});
server.listen(8088);
process.send('listening');