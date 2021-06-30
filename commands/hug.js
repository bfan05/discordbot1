const profileModel = require("../models/profileSchema");

module.exports = {
    name: 'hug',
    aliases: [''],
    permissions: [],
    description: 'Hug someone.',
    async execute(client, message, args, Discord, profileData) {
        if (!args.length) return message.channel.send('You need to mention a member to hug them!');

        const target = message.mentions.users.first();
        if (!target) return message.channel.send("That user does not exist!");

        return message.channel.send(`**${message.author.username}** gives **${target.username}** a bear hug! How cute!`)
    }
}