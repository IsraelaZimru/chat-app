const mongoose = require('mongoose');
const { Schema } = mongoose;

const roomSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    users: [{ type: String }],
    messages: []
})

module.exports = mongoose.model('Room', roomSchema);

