const mongoose = require('mongoose');

const ObservedUser = new mongoose.Schema({
    observerId: String,
    steamid: String
})

module.exports = mongoose.model('ObservedUser', ObservedUser);