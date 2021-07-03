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

        let gifs = [
            'https://media.tenor.co/videos/4b637afdfee44b81fe9cc8094769cc76/mp4',
            'https://media.tenor.co/videos/ca0708e443b32e78f3fd48589bc0a130/mp4',
            'https://media.tenor.co/videos/f8b498ef86f4fbc4f1eed5a11a15b50e/mp4',
            'https://media.tenor.co/videos/a5274a1ff8913795bb865075b4b57acf/mp4',
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