const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const studentschema = new mongoose.Schema({
        
    student_email: {
        type: String,
        required: true,
        unique: true
    },
    student_firstname: {
        type: String,
        required: true,
    },
    student_lastname: {
        type: String,
        required: true,
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
    student_dp: {
        type: String,
        default: '',
    },
    student_chats:{
        type: Array,
        default: []
    },
})

studentschema.pre('save', async function (next) {
    const student = this;

    if(!student.isModified('password')) {
        return next();
    }
    student.password = await bcrypt.hash(student.password, 8);
    next();
})


mongoose.model("student", studentschema);