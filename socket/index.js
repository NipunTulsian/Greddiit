const io = require("socket.io")(8900, {
    cors: {
        origin: "http://localhost:3000"
    },
});

let users = [];

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
    console.log(users);
}

const removeUser = (socketId) => {
    users = users.filter((element) => element.socketId !== socketId)
    console.log(users);
}

const getUser = (userId) => {
    return users.find(user => user.userId === userId);
}

io.on("connection", (socket) => {
    //when connect
    console.log("user connected");

    //take userId and socketId from user
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
        io.emit("getUsers", users);
    })

    //send and get message
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
        //console.log("==", receiverId);
        const user = getUser(receiverId);
        console.log( user);
        io.to(user?.socketId).emit("getMessage", {
            senderId: senderId,
            text: text,
        });
    });

    //when disconnect
    socket.on("disconnect", () => {
        console.log("user disconnected");
        removeUser(socket.id);
        io.emit("getUsers", users);
    })
})