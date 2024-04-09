export class SocketHandler {

    constructor(socket) {
        this.socket = socket;
    }

    userConnected(callback) {
        let socket = this.socket;
        this.socket.on('connect', () => callback(socket));
    }

    initialized() {
        this.socket.on('connect', console.log("El usuario se ha conectado"));
        this.socket.on('disconnect', console.log("El usuario se ha desconectado"));
        this.socket.on('reconnect', console.log("El usuario se ha reconectado"));
        this.socket.on('reconnect_attempt', console.log("El usuario se ha intentado reconectar"));
        this.socket.on('connect_error', console.log("Error al conectarse"));
    }

    usersOnline(callback) {
        this.socket.on('user-list', (usersOnline) => callback(usersOnline));
    }

    emitMessage(message) {
        let data = { id: this.socket.id, message };
        this.socket.emit('box-message-from-client', data);
    }

    getMessage(callback) {
        this.socket.on('box-message-from-server', (message) => {
            const same = this.socket.id === message.id;
            callback(message, same)
        });
    }

}