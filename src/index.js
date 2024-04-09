"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server);
app.use(express_1.default.static(path_1.default.join(__dirname, 'views')));
app.get('/', (req, res) => {
    res.sendFile(__dirname + 'views/index.html');
});
const socketsOnline = [];
io.on('connection', (socket) => {
    socketsOnline.push(socket.id);
    io.emit('user-list', socketsOnline);
    socket.on('disconnect', () => {
        socketsOnline.splice(socketsOnline.indexOf(socket.id), 1);
        io.emit('user-list', socketsOnline);
    });
    socket.on('box-message-from-client', message => {
        io.emit('box-message-from-server', message);
    });
});
server.listen(3000, () => {
    console.log('listening on http://localhost:3000');
});
