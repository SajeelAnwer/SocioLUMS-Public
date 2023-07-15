const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const message_schema = new mongoose.Schema({
    sender_id: {
        type: String,
        required: true
    },
    receiver_id: {
        type: String,
        required: true
    },
    room_id: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
}, { timestamps: true });

mongoose.model("Message", message_schema);