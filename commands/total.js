const profileModel = require("../models/profileSchema");

module.exports = {
    name: 'total',
    aliases: [],
    permissions: [],
    description: 'Check the total TMC Cash in circulation.',
    async execute(client, message, args, Discord, profileData) {
        profileModel.find().sort({coins: -1});
        const response = await profileModel.find().then((data) => {
            data.forEach((prof) => {
                message.channel.send(`**${prof.usernm}** currently has **${prof.coins}** TMC Cash!`);
            });
        });
    }
}