const express = require('express')
const router = express.Router();
const auth = require('../../middleware/auth')
const User = require('../../models/User')
const Disease = require('../../models/Disease')
const Payment = require('../../models/Payment')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config');
const { isValidObjectId } = require('mongoose');


//BUY REMEDY
router.post("/buy", auth, async (req, res) => {
    const { diseaseId } = req.body
    try {
        var user = await User.findOne({ _id: req.user.id })
        if (user) {
            var checkDisease = await Disease.findOne({ _id: diseaseId })
            if (checkDisease) {
                console.log(checkDisease)
                user = await User.findOneAndUpdate({ _id: req.user.id }, { $push: { disease: diseaseId } })
                user = await User.findOne({ _id: req.user.id }).populate('disease')
                return res.json({ user })
            } else {
                return res.json({ msg: 'Diease Not Found' })
            }
        }

    } catch (err) {
        console.log(err)
    }
})

//GET USER DISEASE
router.get("/disease", auth, async (req, res) => {
    try {
        var user = await User.findOne({ _id: req.user.id }).select('disease').populate('disease')
        if (user) {
            const unique = [];
            user.disease.map(x => unique.filter(a => a.title == x.title && a._id == x._id).length > 0 ? null : unique.push(x));
            console.log(unique.length, 'HEHE')
            user.disease = unique;
            return res.json({ user })
        }
    } catch (err) {
        console.log(err)
    }
})

router.post('/disease/payment', auth, async (req, res) => {
    const { diseaseId } = req.body
    try {
        var user = await User.findOne({ _id: req.user.id })
        if (user) {
            var checkDisease = await Disease.findOne({ _id: diseaseId })
            if (checkDisease) {
                var payment = new Payment({
                    disease: diseaseId,
                    user: req.user.id,
                    price: '9.37'
                })
                await payment.save()
                return res.json({ payment })
            } else {
                return res.json({ msg: 'Diease Not Found' })
            }
        }

    } catch (err) {
        console.log(err)
    }
})

router.get('/disease/history', auth, async (req, res) => {
    try {
        console.log(req.user.id)
        var diseases = await Payment.find({ user: req.user.id  }).populate('disease')
        if(diseases){

            const unique = [];
            diseases.map(x => unique.filter(a => a.disease._id == x.disease._id).length > 0 ? null : unique.push(x));
            return res.json({ unique })
        } else {
            return res.json({ msg: 'Not Found' })
        }
    } catch (err) {
        console.log(err)
    }
})



module.exports = router;