const profileModel = require('../models/profileSchema')

module.exports = {
    name: 'beg',
    aliases: [],
    permissions: [],
    description: 'beg for coins',
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
        return message.channel.send(`**${message.author.username}** you begged and received **${randomNumber}** jj cash!`);
    },
}