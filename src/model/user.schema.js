const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')

mongoose.plugin(slug)

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        dropDups: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    role: {
        type: String,
        enum: ['member', 'admin'],
        default: 'member'
    }
}, {
    timestamps: true
})

const UserModel = mongoose.model("User", UserSchema)

module.exports = UserModel;