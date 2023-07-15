const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const societyschema = new mongoose.Schema({
        
    Society_email: {
        type: String,
        required: true,
        unique: true
    },
    Society_name: {
        type: String,
        required: true,
    },
    Society_description:{
        type: String,
        default: ''
    },
    password: {
        type: String,
        required: true,
    },
    account_type: {
        type: String,
        required: true,
        //default: 'Student',
    },
    Society_dp: {
        type: String,
        default: '',
    },
    Society_cover:{
        type: String,
        default: ''
    },
    Society_posts:{
        type: Array,
        default: []
    },
    Society_chats:{
        type: Array,
        default: []
    }
})

societyschema.pre('save', async function (next) {
    const society = this;

    if(!society.isModified('password')) {
        return next();
    }
    society.password = await bcrypt.hash(society.password, 8);
    next();
})


mongoose.model("society", societyschema);