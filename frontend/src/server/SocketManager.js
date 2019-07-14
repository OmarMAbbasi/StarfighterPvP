var app = require('http').createServer()
var io = module.exports.io = require('socket.io')(app)

const PROCESS = process.env.port || 3231;

const SocketManager = requrie('./SocketManager')

io.onconnection('connection, SocketManager')

app.listen(PORT, ()=> {
    console.log('connected to port:' + PORT)
}) 