const profileModel = require("../models/profileSchema");

module.exports = {
    name: 'resetall',
    aliases: ['rsall'],
    permissions: ['ADMINISTRATOR'],
    description: "Reset everyone's TMC Cash",
    async execute(client, message, args, Discord, profileData) {
        profileModel.find().then((data) => {
            data.forEach((prof) => {
                profileModel.updateOne({ _id: prof._id }, {$set: {coins: 0, total: 0}})
            });
        }); 
        message.channel.send('Reset complete!');
    }
}