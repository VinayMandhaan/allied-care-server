const mongoose = require('mongoose')

const DiseaseSchema = new mongoose.Schema({
    title: {
        type: String
    },
    causes: {
        type: [String]
    },
    symptoms: {
        type: [String]
    },
    remedies: {
        type: [String]
    },
    price:{
        type: Number
    }
})

module.exports = Disease = mongoose.model('disease', DiseaseSchema)