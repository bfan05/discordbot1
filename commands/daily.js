const profileModel = require('../models/profileSchema')

module.exports = {
    name: 'daily',
    aliases: [],
    permissions: [],
    description: 'Claim your daily TMC Cash!',
    async execute(client, message, args, Discord, profileData) {
        const randomNumber = Math.floor(Math.random() * 200) + 1;
        const response = await profileModel.findOneAndUpdate(
            {
                userID: message.author.id,
            }, 
            {
                $inc: {
                    coins: randomNumber,
                },
            }
        );
        return message.channel.send(`**${message.author.username}** you claimed your daily and received **${randomNumber}** TMC Cash!`);
    },
}