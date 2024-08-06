const io = require('socket.io')(3001, {
    cors: {
        origin: "https://chatapp-seven-hazel.vercel.app",
        methods: ["GET", "POST"],
    },
});

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('join', (room) => {
        socket.join(room);
    });
    socket.on('sendMessage', (message) => {
        const channelName = `room-${message.roomID}`;
        const eventName = 'new-message';

        // Emit the event with the message details
        socket.to(channelName).emit(eventName, {
            id: message.id,
            message: message.message,
            userID: message.userID,
            userName: message.userName,
            
        });
    });
    socket.on('deleteMessage', (message) => {
        const channelName = `room-${message.roomID}`;
        const eventName = 'delete-message';

        // Emit the event with the message details
        socket.to(channelName).emit(eventName, {
            id: message.id,
        });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});
console.log('Server listening on port 3001');