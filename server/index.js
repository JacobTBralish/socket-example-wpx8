const express = require('express');
const app = express();
const server = require('http').createServer(app)
const bodyParser = require('body-parser');
const io = require('socket.io')(server)


app.use( express.static( `${__dirname}/../build` ) );

io.sockets.on('connection', (socket) =>{
    console.log('user connected')

    socket.join('cool')

    socket.on('message', (josh) => {
        console.log(josh)
        io.in('cool').emit('messageFromServer', josh);
    })

    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
})

const path = require('path')
app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../build/index.html'));
})

const PORT = 4000;
server.listen(PORT, ()=> console.log(`Server listening on port PORT`));