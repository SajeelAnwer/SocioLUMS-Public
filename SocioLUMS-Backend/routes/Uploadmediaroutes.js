const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const student = mongoose.model("student");
const society = mongoose.model("society");
const sponsor = mongoose.model("sponsor");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const nodemailer = require("nodemailer");

// return res.status(422).json({error: "Please add all the fields"});
// return res.status(422).json({error: "Invalid Credentials"});
// return res.status(422).json({error: "Server Error"});
// return res.status(200).json({message: "Pasword changed sucessfully!"})
/*
Society_Posts: 
[
    post_image: uri
    post_description: string
    post_likes: {
        student1
        student2
    }
    post_comments: [
        {
            comment_id
            comment_name
            comment
        },
        {
            comment_id2
            comment_name
            comment
        }
    ]
]

*/


//society upload post pictures
router.post('/societyuploadpost', (req,res)=>{
    const {Society_email, post_image, post_description} = req.body

    society.findOne({Society_email: Society_email}).then(saveduser =>{
        if(!saveduser){
            return res.status(422).json({error: "Invalid Credentials"});
        }
        else{
            saveduser.Society_posts.push({post_image, post_description, post_likes: [], post_comments: []});
            saveduser.save()
            .then(society => {
                return res.status(200).json({message: "Post made successfully"})
            })
            .catch(err=>{
                return res.status(422).json({error: "Error in making post"});
            })
        }
    })
    .catch(err=> {
        console.log(err)
    })
})

//sponsor upload post pictures
router.post('/sponsoruploadpost', (req,res)=>{
    const {Sponsor_email, post_image, post_description} = req.body

    sponsor.findOne({Sponsor_email: Sponsor_email}).then(saveduser =>{
        if(!saveduser){
            return res.status(422).json({error: "Invalid Credentials"});
        }
        else{
            saveduser.Sponsor_posts.push({post_image, post_description, post_likes: [], post_comments: []});
            saveduser.save()
            .then(sponsor => {
                return res.status(200).json({message: "Post made successfully"})
            })
            .catch(err=>{
                return res.status(422).json({error: "Error in making post"});
            })
        }
    })
    .catch(err=> {
        console.log(err)
    })
})






module.exports = router;