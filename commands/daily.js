const profileModel = require('../models/profileSchema')

module.exports = {
    name: 'daily',
    aliases: [],
    cooldown: 86400,
    permissions: [],
    description: 'Claim your daily TMC Cash!',
    async execute(client, message, args, Discord, profileData) {
        const randomNumber = Math.floor(Math.random() * 26) + 25;
        const response = await profileModel.findOneAndUpdate(
            {
                userID: message.author.id,
            }, 
            {
                $inc: {
                    coins: randomNumber,
                    total: randomNumber,
                },
            }
        );
        return message.channel.send(`**${message.author.username}** you claimed your daily and received **${randomNumber}** TMC Cash!`);
    },
}