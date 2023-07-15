const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Student = mongoose.model("student");
const Society = mongoose.model("society");
const Message = mongoose.model("Message");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const nodemailer = require('nodemailer');

router.post('/savemsgtodb', async (req, res) => {
    const { student_id, soc_id, room_id, message } = req.body;
    // console.log("Text received: ", req.body);

    try {
        const msg = new Message({
            student_id,
            soc_id,
            room_id,
            message
        })
        await msg.save();
        res.send({message:"Message saved to db"});
    } catch(err) {
        console.log(err);
        res.status(422).send("Error saving message to db");
    }
})

router.post('/getmsgfromdb', async (req, res) => {
    const { room_id } = req.body;
    // console.log("Text received: ", req.body);
    Message.find({room_id: room_id}).then((messages) => {
        res.send(messages);
    }).catch((err) => {
        console.log(err);
        res.status(422).send("Error getting messages from db");
    })
})

router.post('/setstudentmsgs'), async (req, res) => {
    const {last_msg, student_id, soc_id, room_id} = req.body;
    // console.log("Text received: ", req.body);
    Student.find({_id: student_id}).then((student) => {
        student.student_chats.map(item=>{
            if(item.student_id == student_id){
                Student.student_chats.pull(item.soc_id);
            }
        })
        const date = Date.now();
        Student.student_chats.push({
            last_msg,
            student_id,
            soc_id,
            room_id,
            date
        })
        student.save();
        res.status(200).send({message: "Student chats updated"});
    }).catch((err) => {
        console.log(err);
        res.status(422).send("Error updating student chats", err);
    });
}

router.post('/getstudentmsgs', async (req, res) => {
    const student_id = req.body.student_id;
    // console.log("User ID received: ", student_id);
    Student.findOne({_id: student_id}).then((student) => {
        res.send(student.student_chats);
    }).catch((err) => {
        console.log(err);
        res.status(422).send("Error getting student chats", err);
    })
})

router.post('/setsocmsgs'), async (req, res) => {
    const {last_msg, student_id, soc_id, room_id} = req.body;
    // console.log("Text received: ", req.body);
    Society.find({_id: soc_id}).then((society) => {
        society.Society_chats.map(item=>{
            if(item.soc_id == soc_id){
                Society.Society_chats.pull(item.soc_id);
            }
        })
        const date = Date.now();
        Society.Society_chats.push({
            last_msg,
            student_id,
            soc_id,
            room_id,
            date
        })
        society.save();
        res.status(200).send({message: "Society chats updated"});
    }).catch((err) => {
        console.log(err);
        res.status(422).send("Error updating society chats", err);
    });
}

router.post('/getsocmsgs', async (req, res) => {
    const soc_id = req.body.soc_id;
    // console.log("User ID received: ", soc_id);
    Society.findOne({_id: soc_id}).then((society) => {
        res.send(society.Society_chats);
    }).catch((err) => {
        console.log(err);
        res.status(422).send("Error getting society chats", err);
    })
})


module.exports = router;





