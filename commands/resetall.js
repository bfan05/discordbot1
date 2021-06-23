const profileModel = require("../models/profileSchema");

module.exports = {
    name: 'resetall',
    aliases: ['rsall'],
    permissions: ['ADMINISTRATOR'],
    description: "Reset everyone's TMC Cash",
    async execute(client, message, args, Discord, profileData) {
        profileModel.find().then((data) => {
            data.forEach((prof) => {
                prof.coins = 0;
                prof.total = 0;
            });
        }); 
        message.channel.send('Reset complete!');
    }
}