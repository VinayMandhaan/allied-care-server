const express = require('express')
const router = express.Router();
const Disease = require('../../models/Disease')
const bcrypt = require('bcryptjs')
const config = require('config')

//CREATE DISEASE

router.post("/", async (req, res) => {
    const { title, causes, symptoms, remedies, price } = req.body
    try {
        let disease = new Disease({
            title,
            causes,
            symptoms,
            remedies,
            price
        })
        await disease.save()
        return res.json({ disease })
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
})


router.get("/", async (req, res) => {
    try {
        let disease = await Disease.find()
        console.log(disease, 'DISEASE')
        if (disease.length > 0) {
            return res.json(disease)
        } else {
            return res.json({ msg: 'No Disease Found' })
        }
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
})


module.exports = router;