const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    disease: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "disease",
        }
    ],
})

module.exports = User = mongoose.model('user', UserSchema)