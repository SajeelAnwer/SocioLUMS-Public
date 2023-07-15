const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const sponsorschema = new mongoose.Schema({
        
    Sponsor_email: {
        type: String,
        required: true,
        unique: true
    },
    Sponsor_name: {
        type: String,
        required: true,
    },
    Sponsor_description:{
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
    Sponsor_dp: {
        type: String,
        default: '',
    },
    Sponsor_cover:{
        type: String,
        default: ''
    },
    Sponsor_posts:{
        type: Array,
        default: []
    },
    Sponsor_chats:{
        type: Array,
        default: []
    },


})

sponsorschema.pre('save', async function (next) {
    const sponsor = this;

    if(!sponsor.isModified('password')) {
        return next();
    }
    sponsor.password = await bcrypt.hash(sponsor.password, 8);
    next();
})


mongoose.model("sponsor", sponsorschema);