const io = require('socket.io')(3001, {
    cors: {
        origin: "http://localhost:3000",
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
            message: message.message,
            userID: message.userID,
            userName: message.userName,
            
        });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});
console.log('Server listening on port 3001');
// when using middleware `hostname` and `port` must be provided below
// const app = next({ dev, hostname, port });
// const handler = app.getRequestHandler();

// app.prepare().then(() => {
//   const httpServer = createServer(handler);

//   const io = new Server(httpServer);

//   io.on("connection", (socket) => {
//     // ...
//   });

//   httpServer
//     .once("error", (err) => {
//       console.error(err);
//       process.exit(1);
//     })
//     .listen(port, () => {
//       console.log(`> Ready on http://${hostname}:${port}`);
//     });
// });