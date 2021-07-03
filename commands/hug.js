const profileModel = require("../models/profileSchema");

function randomNumber(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
}

module.exports = {
    name: 'hug',
    aliases: [''],
    permissions: [],
    description: 'Hug someone.',
    async execute(client, message, args, Discord, profileData) {
        if (!args.length) return message.channel.send('You need to mention a member to hug them!');

        let values = [
            ['gives', ' a bear hug! How cute!'],
            ['hugs', '. Both agree elle is awful.'],
            ['hugs', ' and crushes their bones!'],
        ];

        const target = message.mentions.users.first();
        if (!target) return message.channel.send("That user does not exist!");

        let random = randomNumber(0, values.length - 1);

        return message.channel.send(`**${message.author.username}** ${values[random][0]} **${target.username}**${values[random][1]}`)
    }
}