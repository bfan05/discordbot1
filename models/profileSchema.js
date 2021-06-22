const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    userID: {type: String, require: true, unique: true},
    serverID: {type: String, require: true, unique: false},
    coins: {type: Number, default: 1000},
    bank: {typer: Number},
})