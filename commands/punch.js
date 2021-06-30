const profileModel = require("../models/profileSchema");

module.exports = {
    name: 'punch',
    aliases: [''],
    permissions: [],
    description: 'Punch someone.',
    async execute(client, message, args, Discord, profileData) {
        if (!args.length) return message.channel.send('You need to mention a member to punch them!');

        const target = message.mentions.users.first();
        if (!target) return message.channel.send("That user does not exist!");

        return message.channel.send(`Wham! **${message.author.username}** gives **${target.username}** a sucker punch right on the stomach!`)
    }
}