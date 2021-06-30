const profileModel = require("../models/profileSchema");

module.exports = {
    name: 'kiss',
    aliases: [''],
    permissions: [],
    description: 'Kiss someone.',
    async execute(client, message, args, Discord, profileData) {
        if (!args.length) return message.channel.send('You need to mention a member to kiss them!');

        const target = message.mentions.users.first();
        if (!target) return message.channel.send("That user does not exist!");

        return message.channel.send(`**${message.author.username}** kisses **${target.username}** on the lips! Awww... you guys are adorable!`)
    }
}