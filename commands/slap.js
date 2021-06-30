const profileModel = require("../models/profileSchema");

module.exports = {
    name: 'slap',
    aliases: [''],
    permissions: [],
    description: 'Slap someone.',
    async execute(client, message, args, Discord, profileData) {
        if (!args.length) return message.channel.send('You need to mention a member to slap them!');

        const target = message.mentions.users.first();
        if (!target) return message.channel.send("That user does not exist!");

        return message.channel.send(`**${message.author.username}** slaps **${target.username}** right in the face! Someone's been naughty...`)
    }
}