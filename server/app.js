var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')
const mongoose = require('mongoose');
const { userJoin, getCurrentUserAndSaveMsgDb, userEnterChatMsg, getRoomUsers, userLeave, userLeavingChatMsg, updateSeenMsgs } = require('./DAL/socket-utils');


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


        //Broadcast message when a user connects:
        socket.broadcast.to(user.room).emit('message', [userEnterChatMsg(user.name)])


    })

    // //Listen for chatMsg
    // socket.on('message', data => {
    //     console.log('message received on servr: ', data);
    //     sockIO.emit('message', [data])
    // })

    // Listen for chatMessage
    socket.on('chatMessage', async msg => {
        const user = await getCurrentUserAndSaveMsgDb(socket.id, msg.room, msg);

        console.log('message received on room', user.room);
        sockIO.to(user.room).emit('message', [msg]);

    });

    // Listen when client tab on focus - to update if message seen:
    socket.on("msgs-seen", async (room) => {
        const msgs = await updateSeenMsgs(room)

        console.log("msgs from seen/unseen-", msgs);
        socket.to(room).emit("get-seen-Msgs", msgs)
    })


    //run when client disconnects    
    // socket.on("disconnect", () => console.log(`a user disconnect!`));  // Runs when client disconnects
    // socket.on('disconnect', async () => {
    //     const user = userLeave(socket.id);
    //     const participants = await getRoomUsers(user.room);

    //     console.log(user.name, "user disconnect");
    //     if (user) {
    //         sockIO.to(user.room).emit(
    //             'message',
    //             [userLeavingChatMsg(user.name)]
    //         );

    //         // Send users and room info
    //         sockIO.to(user.room).emit('roomUsers', {
    //             users: participants
    //         });
    //     }
    // });

    // socket.on('disconnecting', function () {
    //     console.log("disconnecting.. ", socket.id)
    //     notifyFriendOfDisconnect(socket);


    //     function notifyFriendOfDisconnect(socket) {
    //         const rooms = Object.keys(socket.rooms);
    //         rooms.forEach(function (room) {
    //             socket.to(room).emit('roomUsers', {
    //                 users: participants
    //             });
    //         });
    //     }
    // });

    socket.on("disconnecting", async () => {

        console.log("disconnecting user.. ", socket.id)
        for (const room of socket.rooms) {
            if (room !== socket.id) {
                const user = await userLeave(room, socket.id);
                const participants = await getRoomUsers(room);
                socket.to(room).emit('roomUsers', {
                    users: participants
                });

                sockIO.to(room).emit('message',
                    [userLeavingChatMsg(user.name)]
                );
            }
        }
    });



});



// app.use(function (req, res, next) {
//     res.io = sockIO;
//     next();
// });


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
