const profileModel = require("../models/profileSchema");

module.exports = {
    name: 'spank',
    aliases: [''],
    permissions: [],
    description: 'Spank someone.',
    async execute(client, message, args, Discord, profileData) {
        if (!args.length) return message.channel.send('You need to mention a member to spank them!');

        const target = message.mentions.users.first();
        if (!target) return message.channel.send("That user does not exist!");

        return message.channel.send(`**${message.author.username}** gives **${target.username}** a fat spank! Ouchie! We better put some ice on that...`)
    }
}