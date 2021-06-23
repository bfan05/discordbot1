const profileModel = require("../models/profileSchema");

module.exports = {
    name: 'total',
    aliases: [],
    permissions: [],
    description: 'Check the total TMC Cash in circulation.',
    async execute(client, message, args, Discord, profileData) {
        profileModel.find().then((data) => {
            data.forEach((prof) => {
                console.log(prof);
            });
        });
        // profileModel.find().forEach(function(data) {message.channel.send(`${data.userID} currently has ${data.coins} TMC Cash.`)})
    }
}