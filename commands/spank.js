const profileModel = require("../models/profileSchema");

function randomNumber(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
}

module.exports = {
    name: 'spank',
    aliases: [''],
    permissions: [],
    description: 'Spank someone.',
    async execute(client, message, args, Discord, profileData) {
        if (!args.length) return message.channel.send('You need to mention a member to spank them!');

        let values = [
            ['gives', ' a fat spank! Ouchie! We better put some ice on that...'],
            ['spanks', ' as they yelp in pain! Someone\'s been naughty!'],
            ['spanks', ' across their bottom! That\'s going to be sore for quite some time.'],
        ];

        const target = message.mentions.users.first();
        if (!target) return message.channel.send("That user does not exist!");

        let random = randomNumber(0, values.length - 1);

        return message.channel.send(`**${message.author.username}** ${values[random][0]} **${target.username}**${values[random][1]}`)
    }
}