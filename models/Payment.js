const mongoose = require('mongoose')

const PaymentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    disease: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "disease",
    },
    price: {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Payment = mongoose.model('payment', PaymentSchema)