const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    userID: {type: String, require: true, unique: true},
    serverID: {type: String, require: true, unique: false},
    usernm: {type: String, require: true, unique: false},
    coins: {type: Number, default: 0},
    total: {type: Number, default: 0},
    dogs: {type: Number, default: 0},
})

const model = mongoose.model('ProfileModels', profileSchema);

module.exports = model;