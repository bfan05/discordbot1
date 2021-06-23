const profileModel = require("../models/profileSchema");

module.exports = {
    name: 'resetall',
    aliases: ['rsall'],
    permissions: ['ADMINISTRATOR'],
    description: "Reset everyone's TMC Cash",
    async execute(client, message, args, Discord, profileData) {
        const filter = {};
        const update = {
            $set: {
                coins: 0,
                total: 0,
            },
        };
        const result = await profileModel.updateMany(filter, update);
        message.channel.send('Reset complete!');
    }
}