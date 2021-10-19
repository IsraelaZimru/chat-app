const users = [];

//Join user to chat
function userJoin(socketId, name, id, room) {
    const user = { socketId, name, id, room }

    users.push(user)
    return user;
}


//Get current user
function getCurrentUser(socketId) {
    return users.find(user => user.socketId === socketId)
}

function userEnterChatMsg(userName) {
    return {
        name: userName,
        data: `${userName} has joined the chat`,
        time: new Date(Date.now()).getHours() +
            ":" +
            new Date(Date.now()).getMinutes()
    }
}


function userLeavingChatMsg(userName = "") {
    return {
        name: userName,
        data: `${userName ? userName + " has" : "I"} left the chat`,
        time: new Date(Date.now()).getHours() +
            ":" +
            new Date(Date.now()).getMinutes()
    }
}

function getRoomUsers(room) {
    return users.filter(user => user.room === room);
}

// User leaves chat
function userLeave(id) {
    const index = users.findIndex(user => user.socketId === id);

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

module.exports = {
    userJoin,
    getCurrentUser,
    userEnterChatMsg,
    userLeavingChatMsg,
    getRoomUsers,
    userLeave
}