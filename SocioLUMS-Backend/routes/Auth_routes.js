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

// emailer for sociolums
async function emailer(receiveremail, Vcode){
    
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,

        secure: false,
        requireTLS: true,
        auth: {
            user: process.env.node_emailer_email,
            pass: process.env.node_emailer_password,
        },
    })

    let info = await transporter.sendMail({
        from: "SocioLUMS",
        to: `${receiveremail}`,
        subject: "Email Verification",
        text: `Your Email Verification code is: ${Vcode}`,
        html: `<b>Your Email Verification code is: ${Vcode}</b>`,
    })

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

// signup verification
router.post('/verify', (req, res) => {
    const {student_email, rollnumber} = req.body;
    //console.log(req.body);
    //console.log(rollnumber.length)
    if(rollnumber.length != 8){
        
        // console.log("invalid roll")
        return res.status(422).json({error: "Invalid rollnumber"});
    }
    else if(!student_email){
        // console.log("here")
        return res.status(422).json({error: "Please add all the fields"});
    }
    else{
        // console.log("here2")
        student.findOne({student_email: student_email}).then(async (saveduser)=> {
            // console.log("here3")
            // console.log("saved: ", saveduser)
            if(saveduser){
                return res.status(422).json({error: "User already exists"});
            }    
            try{
                let verificationcode = Math.floor(100000 + Math.random()*900000);
                await emailer(student_email, verificationcode);
                //console.log("Verificatincode: ", verificationcode);
                return res.status(200).json({message: "Verification code has been sent to your email", verificationcode, student_email});
            }catch(err){
                return res.status(422).json({error: "Error sending email"});
            }
            
        })
    }
    
})

//signup verification society //still remaining student email can also sign up as society
router.post('/verifysociety', (req, res) => {
    const {Society_email} = req.body;
    //console.log(req.body);

    //check: will uncoment once societies are here
    // let start = Society_email.length - 12;
    // let domain = Society_email.substring(start, Society_email.length);

    // if(domain != "@lums.edu.pk" || Society_email.length == 20){
    //     return res.status(422).json({error: "Invalid Email Address"});
    // }
    //and write else if below


    if(!Society_email){
        return res.status(422).json({error: "Please add all the fields"});
    }
    else {
        society.findOne({Society_email: Society_email}).then(async (saveduser)=> {
            if(saveduser){
                return res.status(422).json({error: "User already exists"});
            }    
            try{
                let verificationcode = Math.floor(100000 + Math.random()*900000);
                await emailer(Society_email, verificationcode);
                //console.log("Verificatincode: ", verificationcode);
                return res.status(200).json({message: "Verification code has been sent to your email", verificationcode, Society_email});
            }catch(err){
                return res.status(422).json({error: "Error sending email"});
            }
            
        })
    }
    
})

//signup verification sponsor
router.post('/verifysponsor', (req, res) => {
    const {Sponsor_email} = req.body;
    //console.log(req.body);

    let start = Sponsor_email.length - 12;
    let domain = Sponsor_email.substring(start, Sponsor_email.length);

    if(domain == "@lums.edu.pk"){
        return res.status(422).json({error: "Invalid Email Address"});
    }
    if(!Sponsor_email){
        return res.status(422).json({error: "Please add all the fields"});
    }
    else {
        sponsor.findOne({Sponsor_email: Sponsor_email}).then(async (saveduser)=> {
            if(saveduser){
                return res.status(422).json({error: "User already exists"});
            }    
            try{
                let verificationcode = Math.floor(100000 + Math.random()*900000);
                await emailer(Sponsor_email, verificationcode);
                //console.log("Verificatincode: ", verificationcode);
                return res.status(200).json({message: "Verification code has been sent to your email", verificationcode, Sponsor_email});
            }catch(err){
                return res.status(422).json({error: "Error sending email"});
            }
            
        })
    }
    
})

// signup checks
router.post('/signup', async (req,res)=>{
    //console.log("called sign up")

    const {student_email, student_firstname, student_lastname, password, account_type} = req.body;
    //console.log(req.body);
    //console.log(student_email, student_firstname, student_lastname, account_type, password);

    if(!student_email || !student_firstname || !student_lastname || !password || !account_type){
        return res.status(422).json({error: "Please add all the fields"});
    }
    else{
        const new_student = new student({
            student_email, 
            student_firstname, 
            student_lastname,  
            password,
            account_type,
        });

        try{
            await new_student.save();
            const token = jwt.sign({_id: new_student._id}, process.env.JWT_SECRET);
            return res.status(200).json({message: "Account registered successfully", token});
        }
        catch(err){         
            console.log(err);
            return res.status(422).json({error: "Account not registered"});     //if email already exists then this response will be sent
        }
    }
})
// signup society check
router.post('/signupsociety', async (req,res)=>{
    //console.log("called sign up")

    const {Society_email, Society_name, password, account_type} = req.body;

    //console.log(req.body);
    //console.log(student_email, student_firstname, student_lastname, account_type, password);

    if(!Society_email || !Society_name || !password || !account_type){
        return res.status(422).json({error: "Please add all the fields"});
    }
    else{
        const new_society = new society({
            Society_email, 
            Society_name,   
            password,
            account_type,
        });

        try{
            await new_society.save();
            const token = jwt.sign({_id: new_society._id}, process.env.JWT_SECRET);
            return res.status(200).json({message: "Account registered successfully", token});
        }
        catch(err){         
            console.log(err);
            return res.status(422).json({error: "Account not registered"});     //if email already exists then this response will be sent
        }
    }
})

//signup sponsor check
router.post('/signupsponsor', async (req,res)=>{
    //console.log("called sign up")

    const {Sponsor_email, Sponsor_name, password, account_type} = req.body;

    //console.log(req.body);
    //console.log(student_email, student_firstname, student_lastname, account_type, password);

    if(!Sponsor_email || !Sponsor_name || !password || !account_type){
        return res.status(422).json({error: "Please add all the fields"});
    }
    else{
        const new_sponsor = new sponsor({
            Sponsor_email, 
            Sponsor_name,   
            password,
            account_type,
        });

        try{
            await new_sponsor.save();
            const token = jwt.sign({_id: new_sponsor._id}, process.env.JWT_SECRET);
            return res.status(200).json({message: "Account registered successfully", token});
        }
        catch(err){         
            console.log(err);
            return res.status(422).json({error: "Account not registered"});     //if email already exists then this response will be sent
        }
    }
})

// login checks
router.post('/login', (req,res)=>{
    
    const {student_email, password, account_type, rollnumber} = req.body;

    if(rollnumber.length != 8){
        return res.status(422).json({error: "Invalid rollnumber"});
    }
    else if(student_email == "" || password =="" || account_type == ""){
        return res.status(422).json({error: "Please add all the fields"});
    }
    
    student.findOne({student_email: student_email}).then((saveduser) => {
        
        if(!saveduser){ //user is not registered
            return res.status(422).json({error: "Invalid email"});
        }

        bcrypt.compare(password, saveduser.password).then( domatch => {
            if(domatch){
                const token = jwt.sign({_id: saveduser._id}, process.env.JWT_SECRET);

                const {_id, student_email, account_type} = saveduser;

                return res.status(200).json({message: "Signed in successfully", token, user:{_id, student_email, account_type}});
            }
            else{
                return res.status(422).json({error: "Invalid email or password"});
            }
        })
    })
})

//login society
router.post('/loginsociety', (req,res)=>{
    
    const {Society_email, password, account_type} = req.body;
    // console.log(req.body)
    //un comment when societies here
    // let start = Society_email.length - 12;
    // let domain = Society_email.substring(start, Society_email.length);

    // if(domain != "@lums.edu.pk" || Society_email.length == 20){
    //     return res.status(422).json({error: "Invalid Email Address"});
    // }
    // add else  ifbelow

    if(Society_email == "" || password =="" || account_type == ""){
        return res.status(422).json({error: "Please add all the fields"});
    }
    
    society.findOne({Society_email: Society_email}).then((saveduser) => {
        // console.log(Society_email)
        // console.log(saveduser)

        if(!saveduser){ //user is not registered
            return res.status(422).json({error: "Invalid email"});
        }

        bcrypt.compare(password, saveduser.password).then( domatch => {
            if(domatch){
                const token = jwt.sign({_id: saveduser._id}, process.env.JWT_SECRET);

                const {_id, Society_email, account_type} = saveduser;

                return res.status(200).json({message: "Signed in successfully", token, user:{_id, Society_email, account_type}});
            }
            else{
                console.log("here")
                return res.status(422).json({error: "Invalid email or password"});
            }
        })
    })
})

//login sponsor
router.post('/loginsponsor', (req,res)=>{
    
    const {Sponsor_email, password, account_type} = req.body;

    let start = Sponsor_email.length - 12;
    let domain = Sponsor_email.substring(start, Sponsor_email.length);

    if(domain == "@lums.edu.pk"){
        return res.status(422).json({error: "Invalid Email Address"});
    }
    else if(Sponsor_email == "" || password == "" || account_type == ""){
        return res.status(422).json({error: "Please add all the fields"});
    }
    
    sponsor.findOne({Sponsor_email: Sponsor_email}).then((saveduser) => {
        
        if(!saveduser){ //user is not registered
            return res.status(422).json({error: "Invalid email"});
        }

        bcrypt.compare(password, saveduser.password).then( domatch => {
            if(domatch){
                const token = jwt.sign({_id: saveduser._id}, process.env.JWT_SECRET);

                const {_id, Sponsor_email, account_type} = saveduser;

                return res.status(200).json({message: "Signed in successfully", token, user:{_id, Sponsor_email, account_type}});
            }
            else{
                return res.status(422).json({error: "Invalid email or password"});
            }
        })
    })
})

// forgot password verification 
router.post('/fpverifyemail', (req, res) => {
    const {student_email} = req.body;
    //console.log("in verifyemailfp")
    //console.log(req.body);
    if(!student_email){
        return res.status(422).json({error: "Please add all the fields"});
    }
    
    student.findOne({student_email: student_email}).then(async (saveduser)=> {
        if(saveduser){
            // return res.status(422).json({error: "User already exists"});
            try{
                let verificationcode = Math.floor(100000 + Math.random()*900000);
                await emailer(student_email, verificationcode);
                //console.log("Verificatincode: ", verificationcode);
                return res.status(200).json({message: "Verification code has been sent to your email", verificationcode, student_email});
            }
            catch(err){
                return res.status(422).json({error: "Error sending email"});
            }  
        } 
        else {

            return res.status(422).json({error: "User does not exist"});
        }    
    })
})

//society forgot password verification
router.post('/societyfpverifyemail', (req, res) => {
    const {Society_email} = req.body;

    if(!Society_email){
        return res.status(422).json({error: "Please add all the fields"});
    }
    
    society.findOne({Society_email: Society_email}).then(async (saveduser)=> {
        if(saveduser){
            try{
                let verificationcode = Math.floor(100000 + Math.random()*900000);
                await emailer(Society_email, verificationcode);
                return res.status(200).json({message: "Verification code has been sent to your email", verificationcode, Society_email});
            }
            catch(err){
                return res.status(422).json({error: "Error sending email"});
            }  
        } 
        else {
            return res.status(422).json({error: "User does not exist"});
        }    
    })
})

//sponsor forgot password verification
router.post('/sponsorfpverifyemail', (req, res) => {
    const {Sponsor_email} = req.body;

    if(!Sponsor_email){
        return res.status(422).json({error: "Please add all the fields"});
    }
    
    sponsor.findOne({Sponsor_email: Sponsor_email}).then(async (saveduser)=> {
        if(saveduser){
            try{
                let verificationcode = Math.floor(100000 + Math.random()*900000);
                await emailer(Sponsor_email, verificationcode);
                return res.status(200).json({message: "Verification code has been sent to your email", verificationcode, Sponsor_email});
            }
            catch(err){
                return res.status(422).json({error: "Error sending email"});
            }  
        } 
        else {
            return res.status(422).json({error: "User does not exist"});
        }    
    })
})

// forgot password checks
router.post('/forgotpassword', (req,res) => {

    const {student_email, password} = req.body;

    if (!student_email) {
        return res.status(422).json({error: "Please add all the fields"});
    } 
    else{

        student.findOne({student_email: student_email}).then(async (savedUser) => {

            if (savedUser) {

                savedUser.password = password
                savedUser.save().then((user) => {

                    return res.status(200).json({message: "Pasword changed sucessfully!"})

                }).catch((err) => {
                    console.log(err)
                })

            } 
            else {
                return res.status(422).json({error: "Invaid Email"})
            }
        })
    } 
})

//society forgot password check
router.post('/societyforgotpassword', (req,res) => {

    const {Society_email, password} = req.body;

    if (!Society_email) {
        return res.status(422).json({error: "Please add all the fields"});
    } 
    else{
        society.findOne({Society_email: Society_email}).then(async (savedUser) => {
            if(savedUser){
                savedUser.password = password
                savedUser.save()
                .then((user) => {
                    return res.status(200).json({message: "Pasword changed sucessfully"})
                })
                .catch((err) => {
                    console.log(err)
                })
            } 
            else{
                return res.status(422).json({error: "Invaid Email"})
            }
        })
    } 
})

//sponsor forgot password check
router.post('/sponsorforgotpassword', (req,res) => {

    const {Sponsor_email, password} = req.body;

    if (!Sponsor_email) {
        return res.status(422).json({error: "Please add all the fields"});
    } 
    else{
        sponsor.findOne({Sponsor_email: Sponsor_email}).then(async (savedUser) => {
            if(savedUser){
                savedUser.password = password
                savedUser.save()
                .then((user) => {
                    return res.status(200).json({message: "Pasword changed sucessfully"})
                })
                .catch((err) => {
                    console.log(err)
                })
            } 
            else{
                return res.status(422).json({error: "Invaid Email"})
            }
        })
    } 
})

// student data route for getting data from db
router.post('/studentdata', (req,res)=>{
    const {student_email} = req.body

    student.findOne({student_email: student_email})
    .then(saveduser => {
        if(!saveduser){
            return res.status(422).json({error: "Student not found"});
        }
        else{
            return res.status(200).json({message: "Student found", student: saveduser});
        }
    })
})

// society data route for getting data from db
router.post('/societydata', (req,res)=>{
    const {Society_email} = req.body
    //console.log(Society_email)
    society.findOne({Society_email: Society_email})
    .then(saveduser => {
        //console.log(saveduser) 
        if(!saveduser){
            return res.status(422).json({error: "Society not found"});
        }
        else{
            return res.status(200).json({message: "Society found", society: saveduser});
        }
    })
})

// sponsor data route for getting data from db
router.post('/sponsordata', (req,res)=>{
    const {Sponsor_email} = req.body
    //console.log(Sponsor_email)
    sponsor.findOne({Sponsor_email: Sponsor_email})
    .then(saveduser => {
        //console.log(saveduser) 
        if(!saveduser){
            return res.status(422).json({error: "Sponsor not found"});
        }
        else{
            //console.log(saveduser)
            return res.status(200).json({message: "Sponsor found", sponsor: saveduser});
            
        }
    })
})

//student updatepassword
router.post('/changepassword', (req, res) => {
    const {oldpassword, password, student_email} = req.body
    //console.log(oldpassword,password,student_email)

    if(!oldpassword || !password || !student_email){
        return res.status(422).json({error: "Please add all the fields"});
    }
    else{
        student.findOne({student_email: student_email}).then(async saveduser => {
            if(saveduser){
                bcrypt.compare(oldpassword,saveduser.password).then(domatch => {
                    if(domatch){
                        saveduser.password = password
                        saveduser.save()
                        .then(student => {
                            res.json({message: "Passsword changed successfully"})
                        })
                        .catch(err => {
                            console.log(err)
                        })
                    }
                    else{
                        return res.status(422).json({error: "Invalid Credentials"});    //old password wrong
                    }
                })
            }
            else{
                return res.status(422).json({error: "Invalid Credentials"});
            }
        })
    }
})

//society updatepassword
router.post('/societychangepassword', (req, res) => {
    const {oldpassword, password, Society_email} = req.body
    //console.log(oldpassword,password,student_email)

    if(!oldpassword || !password || !Society_email){
        return res.status(422).json({error: "Please add all the fields"});
    }
    else{
        society.findOne({Society_email: Society_email}).then(async saveduser => {
            if(saveduser){
                bcrypt.compare(oldpassword,saveduser.password).then(domatch => {
                    if(domatch){
                        saveduser.password = password
                        saveduser.save()
                        .then(society => {
                            res.json({message: "Passsword changed successfully"})
                        })
                        .catch(err => {
                            console.log(err)
                        })
                    }
                    else{
                        return res.status(422).json({error: "Invalid Credentials"});    //old password wrong
                    }
                })
            }
            else{
                return res.status(422).json({error: "Invalid Credentials"});
            }
        })
    }
})

//sponsor updatepassword
router.post('/sponsorchangepassword', (req, res) => {
    const {oldpassword, password, Sponsor_email} = req.body
    //console.log(oldpassword,password,student_email)

    if(!oldpassword || !password || !Sponsor_email){
        return res.status(422).json({error: "Please add all the fields"});
    }
    else{
        sponsor.findOne({Sponsor_email: Sponsor_email}).then(async saveduser => {
            if(saveduser){
                bcrypt.compare(oldpassword,saveduser.password).then(domatch => {
                    if(domatch){
                        saveduser.password = password
                        saveduser.save()
                        .then(sponsor => {
                            res.json({message: "Passsword changed successfully"})
                        })
                        .catch(err => {
                            console.log(err)
                        })
                    }
                    else{
                        return res.status(422).json({error: "Invalid Credentials"});    //old password wrong
                    }
                })
            }
            else{
                return res.status(422).json({error: "Invalid Credentials"});
            }
        })
    }
})

//student update name
router.post('/changename', (req, res)=>{
    const {student_firstname, student_lastname, password, student_email} = req.body
    console.log(student_firstname, student_lastname, password, student_email)
    // console.log(student.student_email)
    if(!student_firstname || !student_lastname || !password){
        return res.status(422).json({error: "Please add all the fields"});
    }
    else{
    student.findOne({student_email: student_email}).then(async saveduser => {
        //console.log("save1: ", saveduser)
        if(saveduser){
            //console.log("save: " ,saveduser)
            bcrypt.compare(password,saveduser.password).then(domatch => {
                if(domatch){
                    saveduser.student_firstname = student_firstname;
                    saveduser.student_lastname = student_lastname;
                    saveduser.save()
                    .then(student => {
                        res.json({message: "Name changed successfully"})
                    })
                    .catch(err => {
                        console.log(err)
                    })
                }
                else{
                    return res.status(422).json({error: "Invalid Credentials"});
                }
            })  
        }
        else{
            return res.status(422).json({error: "Invalid Credentials"});
        }
    })
}
})

//society update name
router.post('/societychangename', (req, res)=>{
    const {Society_name, password, Society_email} = req.body
    //console.log(student_firstname, student_lastname, password, student_email)
    // console.log(student.student_email)
    if(!Society_name || !password){
        return res.status(422).json({error: "Please add all the fields"});
    }
    else{
    society.findOne({Society_email: Society_email}).then(async saveduser => {
        //console.log("save1: ", saveduser)
        if(saveduser){
            //console.log("save: " ,saveduser)
            bcrypt.compare(password,saveduser.password).then(domatch => {
                if(domatch){
                    saveduser.Society_name = Society_name;
                    saveduser.save()
                    .then(society => {
                        res.json({message: "Name changed successfully"})
                    })
                    .catch(err => {
                        console.log(err)
                    })
                }
                else{
                    return res.status(422).json({error: "Invalid Credentials"});
                }
            })  
        }
        else{
            return res.status(422).json({error: "Invalid Credentials"});
        }
    })
}
})

//sponsor updatename
router.post('/sponsorchangename', (req, res)=>{
    const {Sponsor_name, password, Sponsor_email} = req.body
    //console.log(student_firstname, student_lastname, password, student_email)
    // console.log(student.student_email)
    if(!Sponsor_name || !password){
        return res.status(422).json({error: "Please add all the fields"});
    }
    else{
    sponsor.findOne({Sponsor_email: Sponsor_email}).then(async saveduser => {
        //console.log("save1: ", saveduser)
        if(saveduser){
            //console.log("save: " ,saveduser)
            bcrypt.compare(password,saveduser.password).then(domatch => {
                if(domatch){
                    saveduser.Sponsor_name = Sponsor_name;
                    saveduser.save()
                    .then(sponsor => {
                        res.json({message: "Name changed successfully"})
                    })
                    .catch(err => {
                        console.log(err)
                    })
                }
                else{
                    return res.status(422).json({error: "Invalid Credentials"});
                }
            })  
        }
        else{
            return res.status(422).json({error: "Invalid Credentials"});
        }
    })
}
})

//student update dp
router.post('/changedp', (req,res) => {
    const {student_email, student_dp} = req.body

    if(!student_email || !student_dp){
        return res.status(422).json({error: "Please add all the fields"});
    }
    else{
        student.findOne({student_email: student_email}).then(saveduser => {
            if(saveduser){
                saveduser.student_dp = student_dp
                saveduser.save()
                .then(student => {
                    res.json({message: "Image uploaded successfully"})
                })
                .catch(err => {
                    return res.status(422).json({error: "Error in uploading"});
                })
            }
            else{
                return res.status(422).json({error: "Invalid Credentials"});
            }
        })
    }
})

//society update dp
router.post('/societychangedp', (req,res) => {
    const {Society_email, Society_dp} = req.body

    if(!Society_email || !Society_dp){
        return res.status(422).json({error: "Please add all the fields"});
    }
    else{
        society.findOne({Society_email: Society_email}).then(saveduser => {
            if(saveduser){
                saveduser.Society_dp = Society_dp
                saveduser.save()
                .then(society => {
                    res.json({message: "Image uploaded successfully"})
                })
                .catch(err => {
                    return res.status(422).json({error: "Error in uploading"});
                })
            }
            else{
                return res.status(422).json({error: "Invalid Credentials"});
            }
        })
    }
})

//sponsor update dp
router.post('/sponsorchangedp', (req,res) => {
    const {Sponsor_email, Sponsor_dp} = req.body

    if(!Sponsor_email || !Sponsor_dp){
        return res.status(422).json({error: "Please add all the fields"});
    }
    else{
        sponsor.findOne({Sponsor_email: Sponsor_email}).then(saveduser => {
            if(saveduser){
                saveduser.Sponsor_dp = Sponsor_dp
                saveduser.save()
                .then(sponsor => {
                    res.json({message: "Image uploaded successfully"})
                })
                .catch(err => {
                    return res.status(422).json({error: "Error in uploading"});
                })
            }
            else{
                return res.status(422).json({error: "Invalid Credentials"});
            }
        })
    }
})

//society update cover
router.post('/societychangecover', (req,res) => {
    const {Society_email, Society_cover} = req.body

    if(!Society_email || !Society_cover){
        return res.status(422).json({error: "Please add all the fields"});
    }
    else{
        society.findOne({Society_email: Society_email}).then(saveduser => {
            if(saveduser){
                saveduser.Society_cover = Society_cover
                saveduser.save()
                .then(society => {
                    res.json({message: "Image uploaded successfully"})
                })
                .catch(err => {
                    return res.status(422).json({error: "Error in uploading"});
                })
            }
            else{
                return res.status(422).json({error: "Invalid Credentials"});
            }
        })
    }
})

//sponsor update cover
router.post('/sponsorchangecover', (req,res) => {
    const {Sponsor_email, Sponsor_cover} = req.body

    if(!Sponsor_email || !Sponsor_cover){
        return res.status(422).json({error: "Please add all the fields"});
    }
    else{
        sponsor.findOne({Sponsor_email: Sponsor_email}).then(saveduser => {
            if(saveduser){
                saveduser.Sponsor_cover = Sponsor_cover
                saveduser.save()
                .then(sponsor => {
                    res.json({message: "Image uploaded successfully"})
                })
                .catch(err => {
                    return res.status(422).json({error: "Error in uploading"});
                })
            }
            else{
                return res.status(422).json({error: "Invalid Credentials"});
            }
        })
    }
})

//society update description
router.post('/societychangedescription',(req,res)=>{
    const {Society_email, Society_description} = req.body

    if(!Society_description || !Society_email){
        return res.status(422).json({error: "Please add all the fields"});
    }
    society.findOne({Society_email: Society_email}).then(async saveduser => {
        if(saveduser){
            saveduser.Society_description = Society_description
            saveduser.save()
            .then(society=>{
                res.json({message: "Description updated successfully"})
            })
            .catch(err=>{
                return res.status(422).json({error: "Server Error"});
            })
        }
        else{
            return res.status(422).json({error: "Invalid Credetials"});
        }
    })
    .catch(err=>{
        return res.status(422).json({error: "Server Error"});
    })
})

//sponsor update description
router.post('/sponsorchangedescription',(req,res)=>{
    const {Sponsor_email, Sponsor_description} = req.body

    if(!Sponsor_description || !Sponsor_email){
        return res.status(422).json({error: "Please add all the fields"});
    }
    sponsor.findOne({Sponsor_email: Sponsor_email}).then(async saveduser => {
        if(saveduser){
            saveduser.Sponsor_description = Sponsor_description
            saveduser.save()
            .then(sponsor=>{
                res.json({message: "Description updated successfully"})
            })
            .catch(err=>{
                return res.status(422).json({error: "Server Error"});
            })
        }
        else{
            return res.status(422).json({error: "Invalid Credetials"});
        }
    })
    .catch(err=>{
        return res.status(422).json({error: "Server Error"});
    })
})

//serch society profile
router.post('/searchsociety', (req,res)=>{
    const {keyword} = req.body
    // if (!keyword) {
    //     return res.status(422).json({ error: "Please search a society name" });
    // }

    society.find({Society_name: {$regex: keyword, $options: 'i'}})
    .then(society=>{
        let data = [];
        society.map(item=>{
            data.push({
                _id: item._id,
                Society_email: item.Society_email,
                Society_name: item.Society_name,
                Society_dp: item.Society_dp,
            })
        })
        if(data.length == 0){
            return res.status(422).json({error: "No Society found"});
        }
        
        return res.status(200).send({message: "Society Found", society: data})
        
    })
    .catch(err=>{
        return res.status(422).json({error: "Server Error"});
    })
})

//get society data by students
router.post('/getsocietydata',(req,res)=>{
    const {Society_email} = req.body

    society.findOne({Society_email: Society_email})
    .then(saveduser => {
        if(!saveduser){
            return res.status(422).json({error: "Invalid Credentials"});
        }
        let data = {
            _id: saveduser._id,
            Society_email: saveduser.Society_email,
            Society_name: saveduser.Society_name,
            Society_description: saveduser.Society_description,
            Society_dp: saveduser.Society_dp,
            Society_cover: saveduser.Society_cover,
            Society_posts: saveduser.Society_posts
        }
        res.status(200).send({
            society: data,
            message: "Society Found"
        })
    })
})

//all society datd to student main page
//send email,name,dp,post
// router.post('/societiesdata',async (req,res)=>{
//     //console.log("0000")
//     console.log("1111")
    
    

//     // society.find().then(Society=>{
//     //     let soc_data = []
//     //     Society.map(item=>{
//     //         soc_data.push({
//     //            _id: item._id,
//     //            Society_email: item.Society_email,
//     //            Society_name: item.Society_name,
//     //            Society_dp: item.Society_dp,
//     //            Society_posts: item.Society_posts
//     //         })
            
//     //     })
//     //     if(data.length == 0){
//     //         console.log("here")
//     //         return res.status(422).json({error: "No Society found"});
//     //     }
        
//     //     return res.status(200).send({message: "Society Found", soc_data: soc_data})
//     // })
//     // .catch(err=>{
//     //     console.log("here2")
//     //     return res.status(422).json({error: "Server Error"});
//     // })
    
// })

router.post('/societiesdata', async (req, res) => {
    try {
      const Society = await society.find()
      if (Society.length === 0) {
        console.log("here3")
        return res.status(422).json({ error: 'No Society found' })
      }
      const soc_data = Society.map(item => ({
        _id: item._id,
        Society_email: item.Society_email,
        Society_name: item.Society_name,
        Society_dp: item.Society_dp,
        Society_posts: item.Society_posts,
        
      }))
      //console.log("here2")
      //console.log("data: ", soc_data)
      return res.status(200).json({ message: 'Society Found', soc_data: soc_data })
    } catch (err) {
        //console.log("here")
      console.error(err)
      return res.status(422).json({ error: 'Server Error' })
    }
  })
  


// will be updated
router.post('/soc_chat', (req,res)=>{
    
})



module.exports = router;





