const mongoose = require('mongoose');

const ObservedUser = new mongoose.Schema({
    observerId64: String,
    steamid64: String,
    emailSent: Boolean,
    discordSent: Boolean,
})

module.exports = mongoose.model('ObservedUser', ObservedUser);