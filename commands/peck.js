const profileModel = require("../models/profileSchema");

function randomNumber(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
}

module.exports = {
    name: 'peck',
    aliases: [''],
    permissions: [],
    description: 'Peck someone.',
    async execute(client, message, args, Discord, profileData) {
        if (!args.length) return message.channel.send('You need to mention a member to give them a peck!');

        let values = [
            ['gives', ' a quick peck on the cheek.'],
        ];

        const target = message.mentions.users.first();
        if (!target) return message.channel.send("That user does not exist!");

        let random = randomNumber(0, values.length - 1);

        return message.channel.send(`**${message.author.username}** ${values[random][0]} **${target.username}**${values[random][1]}`)
    }
}