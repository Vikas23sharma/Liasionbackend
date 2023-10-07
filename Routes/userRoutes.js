const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { userModel } = require("../Models/userModel")

const userRouter = express.Router()


// Creating Registration Route for the users
userRouter.post("/register", async (req, res) => {
    const { name, email, password } = req.body
    try {
        //Checking if user is already registered or not
        const existinguser = await userModel.findOne({ email })
        if (existinguser) {
            res.status(200).send({ message: "User already registered!" })
        }
        else {
            //Hashing password before saving user in the database
            bcrypt.hash(password, saltRounds = 3, async function (err, hash) {
                if (err) {
                    res.status(400).send({ error: err.message })
                }
                else if (hash) {
                    const user = userModel({ name, email, password: hash })
                    await user.save()
                    res.status(200).send({ message: "New user registered successfully" })
                }
            });
        }
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
})

//Creating login Route for the user

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await userModel.findOne({ email })

        if (!user) {
            res.status(400).send({ message: "User not found!" })
        }
        else {
            bcrypt.compare(password, user.password, function (err, result) {
                if (err) {
                    res.status(200).send({ message: err.message })
                }
                else if (result) {
                    const token = jwt.sign({
                        data: {
                            name: user.name,
                            userid: user._id,
                        }
                    }, 'liasion', { expiresIn: '1d' });
                    res.status(200).send({ message: "User Login Successful ", token, user: user.name })
                }
                else {
                    res.status(200).send({ message: "Incorrect Password!" })
                }
            });
        }
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
})

module.exports = { userRouter }