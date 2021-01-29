const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    steamid: String,
    email: String
})

module.exports = mongoose.model('User',UserSchema);