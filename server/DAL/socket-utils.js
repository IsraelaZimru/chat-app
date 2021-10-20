const Room = require('../database/models/room')
const moment = require('moment')
const users = [];

//Join user to chat
async function userJoin(socketId, name, id, room) {
    try {
        const user = { socketId, name, id, room }
        users.push(user)

        const chatRoom = await Room.findOne({ _id: room })
        chatRoom.users.push(user);
        await chatRoom.save();
        // console.log("user-", user);
        // console.log("chatRoom", chatRoom);
        return user;

    } catch (err) { console.log(err); }
}


//Get current user
async function getCurrentUserAndSaveMsgDb(socketId, room, msg) {
    try {
        const chatRoom = await Room.findOne({ _id: room })
        const user = chatRoom.users.find(user => user.socketId === socketId)
        // console.log("getCurrentUser", user);
        chatRoom.msg.push({ name: msg.name, data: msg.data, time: msg.time, seen: msg.seen })
        await chatRoom.save()
        // console.log("chatRoom", chatRoom);
        return users.find(user => user.socketId === socketId)
    } catch (err) {
        console.log(err);
    }
}



function userEnterChatMsg(userName) {
    return {
        name: userName,
        data: `${userName} has joined the chat`,
        time: moment().format('h:mm a'),
        seen: false

    }
}


function userLeavingChatMsg(userName = "") {
    return {
        name: userName,
        data: `${userName ? userName + " has" : "I"} left the chat`,
        time: moment().format('h:mm a'),
        seen: false
    }
}

async function getRoomUsers(room) {
    try {
        const chatRoom = await Room.findOne({ _id: room })
        const users = await chatRoom.users.map(user => {
            return { name: user.name }
        })
        // console.log("participants:", users);
        return users;
        // return users.filter(user => user.room === room);
    } catch (err) {
        console.log(err);
    }
}

// User leaves chat
async function userLeave(roomId, id) {
    try {
        const index = users.findIndex(user => user.socketId === id);
        let leavingUser;

        const chatRoom = await Room.findOne({ _id: roomId }).then(room => {
            const index = room.users.findIndex(user => user.socketId === id);
            if (index !== -1) {
                leavingUser = room.users[index]
                room.users.splice(index, 1)[0];
                return room;
            }

            // console.log("update room-", chatRoom, "user id", id);
            // const newUsersLst = room.users.filter(u => u.socketId !== id);
            // room.users = newUsersLst;
            // return room;

        })
        await chatRoom.save()


        if (index !== -1) {
            return users.splice(index, 1)[0];
        }

    } catch (err) { console.log(err) }
}


async function updateSeenMsgs(room) {
    try {
        const chatRoom = await Room.findOne({ _id: room });
        console.log("before chatRoom", chatRoom);

        const msgs = chatRoom.msg.map(m => ({ ...m, "seen": true }));
        chatRoom.msg = msgs;

        await chatRoom.save()
        console.log("after chatRoom", chatRoom);

        return chatRoom.msg;

    } catch (err) {
        console.log(err);
    }
}


module.exports = {
    userJoin,
    getCurrentUserAndSaveMsgDb,
    userEnterChatMsg,
    userLeavingChatMsg,
    getRoomUsers,
    userLeave,
    updateSeenMsgs
}