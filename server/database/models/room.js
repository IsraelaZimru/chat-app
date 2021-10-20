const mongoose = require('mongoose');
const { Schema } = mongoose;

const roomSchema = new Schema({
    name: {
        type: String,
        required: true,
        index: true
    },
    users: [{}],
    msg: []
})

module.exports = mongoose.models.Room || mongoose.model('Room', roomSchema);

