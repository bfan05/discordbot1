const profileModel = require("../models/profileSchema");

function randomNumber(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
}

module.exports = {
    name: 'lick',
    aliases: [],
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

        let gifs = [
            'https://media1.tenor.com/images/a3d2e38bed3d3ee648328b37409c4d87/tenor.gif?itemid=13886203',
            'https://i.imgur.com/DylehYr.gif',
            'https://i.pinimg.com/originals/81/76/9e/81769ee6622b5396d1489fb4667fd20a.gif',
            'https://media1.tenor.com/images/c4f68fbbec3c96193386e5fcc5429b89/tenor.gif?itemid=13451325'
        ]

        const target = message.mentions.users.first();
        if (!target) return message.channel.send("That user does not exist!");

        let random = randomNumber(0, values.length - 1);
        let randomImage = randomNumber(0, gifs.length - 1);

        const newEmbed = new Discord.MessageEmbed()
        .setColor('#9CCFE7')
        .setAuthor(`${message.author.username} ${values[random][0]} ${target.username}${values[random][1]}`,
        `${message.author.avatarURL({dynamic: true})}`)
        .setImage(`${gifs[randomImage]}`)
        .setFooter('Created by bfan#0125')

        return message.channel.send(newEmbed);
    }
}