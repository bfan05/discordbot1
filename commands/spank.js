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
            'https://image.myanimelist.net/ui/OK6W_koKDTOqqqLDbIoPAhUP2TKouTIPy6TOKmAKybU',
            'https://media1.tenor.com/images/e390c11a59f8c63b7ac7d15f70e9687f/tenor.gif',
            'https://media1.tenor.com/images/b51750728709353206263f0407f0be96/tenor.gif?itemid=16173937',
            'https://media1.tenor.com/images/2eb222b142f24be14ea2da5c84a92b08/tenor.gif?itemid=15905904',
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