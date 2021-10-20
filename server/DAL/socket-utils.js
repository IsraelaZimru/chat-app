const Room = require('../database/models/room')
const moment = require('moment')


//Join user to chat
async function userJoin(socketId, name, id, room) {
    try {
        const user = { socketId, name, id, room }

        const chatRoom = await Room.findOne({ _id: room })
        const index = chatRoom.users.findIndex(user => user.id === id);


        if (index !== -1) {
            const user = chatRoom.users[index];
            user.socketId = socketId;
        } else {
            chatRoom.users.push(user);
        }

        await chatRoom.save();
        return user;

    } catch (err) { console.log(err); }
}


//Get current user
async function getCurrentUserAndSaveMsgDb(socketId, room, msg) {
    try {
        const chatRoom = await Room.findOne({ _id: room })
        const user = chatRoom.users.find(user => user.socketId === socketId)
        chatRoom.msg.push({ name: msg.name, data: msg.data, time: msg.time, seen: msg.seen })
        await chatRoom.save()
        return user;
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
        return users;
    } catch (err) {
        console.log(err);
    }
}

// User leaves chat
async function userLeave(roomId, id) {
    try {
        let leavingUser;

        const chatRoom = await Room.findOne({ _id: roomId }).then(room => {
            const index = room.users.findIndex(user => user.socketId === id);
            if (index !== -1) {
                leavingUser = room.users[index]
                room.users.splice(index, 1)[0];
                return room;
            }

        })

        await chatRoom.save()
        return leavingUser

    } catch (err) { console.log(err) }
}


async function updateSeenMsgs(room) {
    try {
        const chatRoom = await Room.findOne({ _id: room });

        const msgs = chatRoom.msg.map(m => ({ ...m, "seen": true }));
        chatRoom.msg = msgs;

        await chatRoom.save()

        return chatRoom.msg;

    } catch (err) {
        console.log(err);
    }
}

async function saveMsg(room, msg) {
    try {
        const chatRoom = await Room.findOne({ _id: room })
        chatRoom.msg.push({ name: msg.name, data: msg.data, time: msg.time, seen: msg.seen })
        await chatRoom.save()

    } catch (err) { console.log(err) }
}

module.exports = {
    userJoin,
    getCurrentUserAndSaveMsgDb,
    userEnterChatMsg,
    userLeavingChatMsg,
    getRoomUsers,
    userLeave,
    updateSeenMsgs,
    saveMsg
}