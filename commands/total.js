const profileModel = require("../models/profileSchema");

module.exports = {
    name: 'total',
    aliases: [],
    permissions: [],
    description: 'Check the total TMC Cash in circulation.',
    async execute(client, message, args, Discord, profileData) {
        const collection = db.profilemodels;
        const cursor = collection.find({
            __v: 0,
        });
        cursor.forEach(function(data) {message.channel.send(`${data.userID} currently has ${data.coins} TMC Cash.`)})
    }
}