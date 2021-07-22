const profileModel = require("../models/profileSchema");

function randomNumber(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
}

module.exports = {
    name: 'hug',
    aliases: [],
    permissions: [],
    description: 'Hug someone.',
    async execute(client, message, args, Discord, profileData) {
        if (!args.length) return message.channel.send('You need to mention a member to hug them!');

        let values = [
            ['gives', ' a bear hug! How cute!'],
            ['hugs', '. Both agree Maria is awful.'],
            ['hugs', ' and crushes their bones!'],
        ];

        let gifs = [
            'http://25.media.tumblr.com/tumblr_ma7l17EWnk1rq65rlo1_500.gif',
            'https://i.imgur.com/r9aU2xv.gif?noredirect',
            'https://thumbs.gfycat.com/AlienatedUnawareArcherfish-size_restricted.gif',
            'https://i.imgur.com/3OzmqMS.gif'
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