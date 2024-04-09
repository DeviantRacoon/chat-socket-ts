import express from 'express';
import path from 'path';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'views')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + 'views/index.html');
});

const socketsOnline: string[] = [];

io.on('connection', (socket) => {
    socketsOnline.push(socket.id);
    io.emit('user-list', socketsOnline);

    socket.on('disconnect', () => {
        socketsOnline.splice(socketsOnline.indexOf(socket.id), 1);
        io.emit('user-list', socketsOnline);
    });

    socket.on('box-message-from-client', message => {
        io.emit('box-message-from-server', message);
    })

});

server.listen(3000, () => {
    console.log('listening on *:3000');
});