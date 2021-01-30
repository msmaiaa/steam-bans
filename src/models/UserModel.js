const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    steamid64: String,
    sendEmail: Boolean,
    sendDiscord: Boolean,
    email: String,
    discordHook: String,
})

module.exports = mongoose.model('User',UserSchema);