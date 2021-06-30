const profileModel = require("../models/profileSchema");

module.exports = {
    name: 'peck',
    aliases: [''],
    permissions: [],
    description: 'Peck someone.',
    async execute(client, message, args, Discord, profileData) {
        if (!args.length) return message.channel.send('You need to mention a member to give them a peck!');

        const target = message.mentions.users.first();
        if (!target) return message.channel.send("That user does not exist!");

        return message.channel.send(`**${message.author.username}** gives **${target.username}** a peck on the cheek! Muah!`)
    }
}