var express = require('express'); //importing library
var app = express();
var server = app.listen(3000); //connects to port 3000

app.use(express.static('public')); //hosts files stored in public folder

console.log("Socket server initialised");

var socket = require('socket.io');
var io = socket(server); //generates a socket for user to connect to

io.sockets.on('connection', newConnection); //checking if there is a new connection

function newConnection(socket) {
	console.log('New socket connection: ' + socket.id); //logs the id of the user connected

	socket.on('turndata', turnMsg); //

	function turnMsg(data) {
		socket.broadcast.emit('turndata', data); //emits the data to all clients except the sender
		//io.sockets.emit('mouse', data);      //emits data to all clients including the sender
	}

	socket.on('inituser', initialise)

	function initialise(data) {
		socket.broadcast.emit('inituser', data); //inital transfer of connection
	}

	socket.on('confirmation', confirm)

	function confirm(data) {
		socket.broadcast.emit('confirm', data); //confirmation after second socket connects
	}

}