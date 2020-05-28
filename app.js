const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io').listen(server)
const ent = require('ent')

app.get('/', function(req, res) {
	res.sendfile(__dirname + '/socketIoChat.html')
})

io.sockets.on('connection', function(socket) {

	socket.on('newChatter', function(username) {
		username = ent.encode(username)
		console.log(username + ' is now connected !')
		socket.username = username
		socket.broadcast.emit('newChatter', username)
	})

	socket.on('message', function(message) {
		message = ent.encode(message)
		io.emit('message', { name: socket.username, message: message });
	})
})


server.listen(8080)