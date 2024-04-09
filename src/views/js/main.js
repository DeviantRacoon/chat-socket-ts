// Modules
const clientSocket = io();
import { SocketHandler } from "./services/socket.js"
import { updateCurrentUser, appendMessage, onButton, updateUserList } from "./services/doom.js"

// Doom elements
const boxMessage = document.getElementById('box-message');
const currentUser = document.getElementById('currentUser');
const usersOnline = document.getElementById('user-list');
const inputMessage = document.getElementById('input-message');
const btnSend = document.getElementById('btn-send');
const toggleMenu = document.getElementById('toggle-sidebar-btn');

// Functions
const socketHandler = new SocketHandler(clientSocket);
// socketHandler.initialized();

socketHandler.userConnected((socket) => {
    updateCurrentUser(socket.id, currentUser);
});

socketHandler.usersOnline(socket => {
    updateUserList(socket, usersOnline);
});

onButton(btnSend, 'click', () => {
    socketHandler.emitMessage(inputMessage.value);
    inputMessage.value = '';
});

onButton(inputMessage, 'keypress', () => {
    socketHandler.emitMessage(inputMessage.value);
    inputMessage.value = '';
});

socketHandler.getMessage((socket, same) => {
    appendMessage(socket, same, boxMessage);
});

onButton(toggleMenu, 'click', () => {
    document.querySelector('body').classList.toggle('toggle-sidebar');
});
