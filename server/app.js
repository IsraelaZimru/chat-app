var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')
const mongoose = require('mongoose');
const { userJoin, getCurrentUserAndSaveMsgDb, saveMsg, userEnterChatMsg, getRoomUsers, userLeave, userLeavingChatMsg, updateSeenMsgs } = require('./DAL/socket-utils');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var roomsRouter = require('./routes/rooms');

var app = express();


//Connection to DB
const dbConnect = mongoose.connect('mongodb+srv://IsraelaZimru:2DFOudU8lkOZ4uC9@fullstackprojects.epp4t.mongodb.net/websocket',
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => console.log('connected to db'))
    .catch(err => console.log(err));



//connecting to Socket.io
var sockIO = require('socket.io')();
app.sockIO = sockIO;


sockIO.on('connection', socket => {
    console.log(`A client connection occurred!. id= ${socket.id}`);


    //client joinRoom:
    socket.on("joinRoom", async ({ sender, senderId, roomId }) => {
        const user = await userJoin(socket.id, sender, senderId, roomId);
        const participants = await getRoomUsers(user.room);

        socket.join(user.room)
        console.log(`${user.name} join a room- ${user.room}-`, user);

        // Send users and room info
        sockIO.to(user.room).emit('roomUsers', {
            users: participants
        });

        const welcomeMsg = await userEnterChatMsg(user.name)
        await saveMsg(user.room, welcomeMsg)


        //Broadcast message when a user connects:
        socket.broadcast.to(user.room).emit('message', [welcomeMsg])


    })

    // Listen for chatMessage
    socket.on('chatMessage', async msg => {
        const user = await getCurrentUserAndSaveMsgDb(socket.id, msg.room, msg);

        sockIO.to(user.room).emit('message', [msg]);

    });

    // Listen when client tab on focus - to update if message seen:
    socket.on("msgs-seen", async (room) => {
        const msgs = await updateSeenMsgs(room)

        sockIO.to(room).emit("get-seen-Msgs", msgs)
    })


    socket.on("disconnecting", async () => {

        console.log("disconnecting user.. ", socket.id)
        for (const room of socket.rooms) {
            if (room !== socket.id) {
                const user = await userLeave(room, socket.id);
                const participants = await getRoomUsers(room);
                socket.to(room).emit('roomUsers', {
                    users: participants
                });

                const leavingMsg = await userLeavingChatMsg(user.name)
                await saveMsg(room, leavingMsg)


                //Broadcast message when a user connects:
                sockIO.to(room).emit('message', [leavingMsg])

            }
        }
    });

});


app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/rooms', roomsRouter);

module.exports = app;
