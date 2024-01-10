const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    googleId: String,
    displayName: String,
    email: String,
    image: String
}, {timestamps: true})

const userdb = new mongoose.model('users', userSchema);

module.exports = userdb;