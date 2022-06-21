const User = require("../models/userModel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require("mongoose")

const {signUpValidate, signInValidate} = require('../middlewares/validator')

const signUp = async (req, res) => {
    try {
       const errors = signUpValidate(req)
       if (!errors.error) {
        return res.status(400).json({
            success: false,
            message: errors.error
        })
       }
       // check if the user is already registered
        const user = await User.findOne({
            username: req.body.username
        })
        if (user) {
            return res.json({
                result: false,
                message: 'username already in use'
            })
        }
        //hash password
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        // create newUser object
        let newUser = new User({
            name: req.body.name,
            username: req.body.username,
            password: hashedPassword
        })
        //save user in database
        await newUser.save()
        return res.json({
            result: true,
            message: `You can login now ${newUser.name}`
        })
    } catch (err) {
        return res.json({
            msg: err.message
        })
    }
}

const signIn = async (req, res) => {
    try {
        const errors = signInValidate(req)
        if (!errors.error) {
         return res.status(400).json({
             success: false,
             message: errors.error
         })
        } 
        //get user from database
        const user = await User.findOne({
            username: req.body.username
        })
        // check if user exists
        if (!user) {
            return res.status(400).json({
                result: false,
                message: 'username is not registered'
            })
        }
        // check for valid password
        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if (!isMatch) {
           return res.status(403).json({
                result: false,
                message: "Invalid username or password"
            })
        }
        //generate accessToken
        const accessToken = jwt.sign({
            id: user._id,
            role: user.role,
            username: user.username
        }, process.env.SECRET || "mysecret", {
            expiresIn: 3600
        });
        return res.json({
            result: true,
            accessToken: accessToken,
        })
    } catch (err) {
        return res.status(400).json({
            result: false,
            message: err.message
        })
    }
}


module.exports = {
    signUp,
    signIn
}