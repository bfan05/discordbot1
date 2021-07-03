const profileModel = require("../models/profileSchema");

function randomNumber(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
}

module.exports = {
    name: 'throw',
    aliases: [''],
    permissions: [],
    description: 'Throw someone.',
    values: [
        ['throws', 'into the ocean! Have fun drowning!'],
        ['chucks', 'across the room. Sayonara, dumbass!'],
        ['throws', 'into a garbage can! Better go take a shower fast...'],
        ['catapults', 'across the room! We\'re going to need some house renovation...']
    ],
    async execute(client, message, args, Discord, profileData) {
        if (!args.length) return message.channel.send('You need to mention a member to throw them!');

        const target = message.mentions.users.first();
        if (!target) return message.channel.send("That user does not exist!");

        let random = randomNumber(0, values.length - 1);

        return message.channel.send(`**${message.author.username}** ${values[random][0]} **${target.username}** ${values[random][1]}`)
    }
}