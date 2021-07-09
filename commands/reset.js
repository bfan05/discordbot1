const profileModel = require("../models/profileSchema");

module.exports = {
    name: 'reset',
    aliases: ['rs'],
    permissions: ['ADMINISTRATOR'],
    description: "Reset someone's TMC Cash",
    async execute(client, message, args, Discord, profileData) {
        if (!args.length) return message.channel.send('You need to mention a member to reset their TMC Cash!');
        const data = await profileModel.findOne({ userID: message.author.id });
        
        const target = message.mentions.users.first();
        if (!target) return message.channel.send("That user does not exist!");

        const targetData = await profileModel.findOne({ userID: target.id });
        if (!targetData) return message.channel.send(`This user doesn't exist in the database. Tell him or her to use the -join command!`);

        const response = await profileModel.findOneAndUpdate(
            {
                userID: target.id,
            }, 
            {
                $inc: {
                    coins: -targetData.coins,
                    total: -targetData.total,
                    dog: -targetData.dog,
                    copperkey: -targetData.copperkey,
                },
            }
        );
        message.channel.send(`**${target.username}**'s TMC Cash has been reset!`);
        client.channels.cache.get('857330940631187526').send(`**${message.author.username} (${message.author.id})** reset **${target.username}'s (${target.id})** cash.`);
        client.channels.cache.get('857698338051588127').send(`**${message.author.username} (${message.author.id})** reset **${target.username}'s (${target.id})** cash.`);
    }
}