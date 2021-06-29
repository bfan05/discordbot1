const profileModel = require("../models/profileSchema");

module.exports = {
    name: 'resetall',
    aliases: [''],
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
        client.channels.cache.get('857330940631187526').send(`Admin **${message.author.username} (${message.author.id})** reset everyone's cash.`);
        client.channels.cache.get('857698338051588127').send(`Admin **${message.author.username} (${message.author.id})** reset everyone's cash.`);
    }
}