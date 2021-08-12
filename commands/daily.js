const profileModel = require('../models/profileSchema')

module.exports = {
    name: 'daily',
    aliases: [],
    cooldown: 172800,
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
        message.channel.send(`**${message.author.username}** you claimed your daily and received **${randomNumber}** TMC Cash!`);
        //client.channels.cache.get('857330940631187526').send(`**${message.author.username} (${message.author.id})** earned **${randomNumber}** from claiming their daily.`);
        client.channels.cache.get('857698338051588127').send(`**${message.author.username} (${message.author.id})** earned **${randomNumber}** from claiming their daily.`);
    },
}