const express = require('express')
const router = express.Router();
const Disease = require('../../models/Disease')
const bcrypt = require('bcryptjs')
const config = require('config')

//CREATE DISEASE

router.post("/", async (req, res) => {
    const { title, causes, symptoms, remediesList, price } = req.body
    try {
        let disease = new Disease({
            title,
            causes,
            symptoms,
            price
        })
        remediesList.map(s => {
            const newRemedy = {
                remedy: s.remedy,
                category: s.category
            }
            disease.remedies.push(newRemedy)
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


//DELETE DISEASE

router.post('/delete', async (req, res) => {
    try {
        const { id } = req.body
        var disease = await Disease.findOne({ _id: id });
        if (disease) {
            const disease = await Disease.findByIdAndDelete(id);
            return res.json({ msg: "Disease Deleted", disease });
        } else {
            return res.json({ msg: "No Disease Found" });
        }
    } catch (err) {
        console.log(err)
        res.status(500).send("Server Error")
    }
})


//UPDATE DISEASE

router.post('/update', async (req, res) => {
    const { title, causes, symptoms, remediesList, price, id } = req.body
    console.log(id)
    try {
        var disease = await Disease.findOne({ _id: id });
        if (!disease) {
            return res.json({ msg: 'No Disease Found' })
        }
        console.log(disease, 'HEHE')
        disease.title = title ? title : disease.title;
        disease.price = price ? price : disease.price;
        disease.causes = causes ? causes : disease.causes;
        disease.symptoms = symptoms ? symptoms : disease.symptoms;
        disease.remedies = remediesList ? remediesList : disease.remedies;

        await disease.save();
        return res.json({ msg: "Disease Updated", disease });

    } catch (err) {
        console.log(err)
        res.status(500).send("Server Error")
    }
})


module.exports = router;