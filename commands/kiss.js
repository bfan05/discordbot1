const profileModel = require("../models/profileSchema");

function randomNumber(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
}

module.exports = {
    name: 'kiss',
    aliases: [''],
    permissions: [],
    description: 'Kiss someone.',
    async execute(client, message, args, Discord, profileData) {
        if (!args.length) return message.channel.send('You need to mention a member to kiss them!');

        let values = [
            ['kisses', ' right on the lips. Awww... you guys are adorable'],
            ['and', '\'s lips intertwine in a hot mess. Look at them go!'],
            ['gives', ' a big smooch. If only their breath didn\'t smell that bad...'],
        ];

        let gifs = [
            'https://media1.tenor.com/images/d0cd64030f383d56e7edc54a484d4b8d/tenor.gif?itemid=17382422',
            'https://i.imgur.com/lmY5soG.gif',
            'https://www.icegif.com/wp-content/uploads/anime-kiss-icegif-1.gif',
            'https://37.media.tumblr.com/42f96e0adb59440843c94e45650afd19/tumblr_n5mbsq844s1tzpao0o1_500.gif'
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