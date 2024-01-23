// Create web server
var express = require('express');
var app = express();

// Create http server and integrate with express
var http = require('http');
var server = http.createServer(app);

// Create socket.io server and integrate with http server
var io = require('socket.io')(server);

// Set the port
var port = 3000;

// Start the server
server.listen(port, function() {
    console.log('Server listening at port %d', port);
});

// Serve static files
app.use(express.static(__dirname + '/public'));

// Handle socket.io connections
io.on('connection', function(socket) {
    console.log('a user connected');

    socket.on('disconnect', function() {
        console.log('a user disconnected');
    });

    socket.on('send message', function(msg) {
        console.log('message: ' + msg);
        io.emit('receive message', msg);
    });
});