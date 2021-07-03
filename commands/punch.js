const profileModel = require("../models/profileSchema");

function randomNumber(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
}

module.exports = {
    name: 'punch',
    aliases: [''],
    permissions: [],
    description: 'Punch someone.',
    async execute(client, message, args, Discord, profileData) {
        if (!args.length) return message.channel.send('You need to mention a member to punch them!');

        let values = [
            ['gives', 'a sucker punch right in the stomach! Wham!'],
            ['punches', '! Look at them fly...'],
            ['punches', 'and knocks them out. KO!'],
        ];

        const target = message.mentions.users.first();
        if (!target) return message.channel.send("That user does not exist!");

        let random = randomNumber(0, values.length - 1);

        return message.channel.send(`**${message.author.username}** ${values[random][0]} **${target.username}** ${values[random][1]}`)
    }
}