const express = require('express')
const userSchema = require('../models/user')
const messageSchema = require('../models/message')
const route = express.Router()


route.get('/server', (req, res) => {
    res.status(200).send({sever: 1})
})

route.post('/user/login', async (req, res) => {
    try {
        const user = await userSchema.findOne({ user: req.body.user })
        
        if (user != null) {
            if (user.password === req.body.password) {
                res.status(200).json(user)
            } else {
                res.status(300).json({ message: "credentials not valid." })
            }
        } else {
            res.status(300).json({ message: "credentials not valid." })
        }
    } catch (e) {
        res.status(500).json({ message: "error in server." })
    }
})

//create user
route.post('/user/registrer', async (req, res) => {
    console.log(req.body)
    const newUser = new userSchema({
        user: req.body.user,
        password: req.body.password
    })
    try {
        await newUser.save()
        res.status(200).send({ message: "user created." })
    } catch (e) {
        res.status(500).send({ message: "fail in create user." })
    }

})

route.post('/user/message', async (req, res) => {
    console.log(req.body)
    const newMessage = new messageSchema({
        user: req.body.user,
        message: req.body.message
    })
    try {
        await newMessage.save()
        res.status(200).send({ message: "message created." })
    } catch (e) {
        console.log(e)
        res.status(500).send({ message: "fail in create message." })
    }

})
route.get('/messages', async (req, res) => {
    const messages = await messageSchema.find({})
    res.status(200).send(messages)
})

module.exports = route;