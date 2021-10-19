const Room = require('../database/models/room')

const getRooms = async () => {
    try {
        const rooms = await Room.find().then(rooms => {
            return rooms.map(room => {
                return { name: room.name, id: room._id }
            })
        })
        return rooms;

    } catch (error) {
        throw new Error('Unknown error');
    }
}

const getRoom = async (id) => {
    try {
        const isRoom = await Room.findOne({ _id: id }).exec();
        return isRoom
    } catch (error) {
        throw new Error('Unknown error');
    }
}

module.exports = {
    getRooms,
    getRoom,
}