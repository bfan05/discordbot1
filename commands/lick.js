const profileModel = require("../models/profileSchema");

function randomNumber(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
}

module.exports = {
    name: 'lick',
    aliases: [''],
    permissions: [],
    description: 'Lick someone.',
    async execute(client, message, args, Discord, profileData) {
        let values = [
            ['gives', ' a wet lick... yummy'],
            ['licks', ' right on the cheek. Someone\'s getting hydrated...'],
            ['licks', '! Ewww!'],
            ['gives', ' a wet lick. Better spit that hair out!'],
        ];
        if (!args.length) return message.channel.send('You need to mention a member to lick them!');

        const target = message.mentions.users.first();
        if (!target) return message.channel.send("That user does not exist!");

        let random = randomNumber(0, values.length - 1);

        return message.channel.send(`**${message.author.username}** ${values[random][0]} **${target.username}** ${values[random][1]}`)
    }
}