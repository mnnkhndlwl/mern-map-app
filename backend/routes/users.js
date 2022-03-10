const User = require('../models/User')
const router = require("express").Router();
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register",async(req,res)=>{
    try {
        //generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });
        //save user and respond
        const user = await newUser.save();
        res.status(200).json(user._id);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;