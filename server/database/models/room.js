const mongoose = require('mongoose');
const { Schema } = mongoose;

const roomSchema = new Schema({
    name: {
        type: String,
        required: true,
        index: true
    },
    users: [{ type: mongoose.Schema.ObjectId }],
    messages: []
})

module.exports = mongoose.model('Room', roomSchema);

