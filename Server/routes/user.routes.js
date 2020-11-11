const express = require('express')
const userSchema = require('../models/user')
const route = express.Router()

route.get('/user/login', async (req, res) => {
    try {
        const user = await userSchema.findOne({ user: req.body.user })
        console.log(user)
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

module.exports = route;