const express = require('express')
const router = express.Router();
const auth = require('../../middleware/auth')
const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')



// GET USER
router.get("/", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Errro')
    }
})

// LOGIN
router.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid email or password' }] })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Invalid email or password' }] })
        }
        const payLoad = {
            user: {
                id: user.id
            }
        }
        jwt.sign(payLoad, config.get('jwtSecret'), { expiresIn: 36000 }, (err, token) => {
            if (err) {
                throw err
            }
            res.json({ token })
        })

    } catch (err) {
        console.log(err.message)
        res.status(500).send("Server error")
    }
})


//REGISTER
router.post("/register", async (req, res) => {
    const { email, password } = req.body
    try {
        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ errors: [{ msg: 'User already exist' }] })
        }

        user = new User({
            email,
            password
        })

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt)
        await user.save();
        const payLoad = {
            user: {
                id: user.id
            }
        }
        jwt.sign(payLoad, config.get('jwtSecret'), { expiresIn: 36000 }, (err, token) => {
            if (err) {
                throw err
            }
            res.json({ token })
        })

    } catch (err) {
        console.log(err.message)
        res.status(500).send("Server error")
    }
})




module.exports = router