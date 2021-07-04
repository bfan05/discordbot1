const profileModel = require("../models/profileSchema");

function randomNumber(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
}

module.exports = {
    name: 'elle',
    aliases: [''],
    permissions: [],
    description: 'Elle!',
    async execute(client, message, args, Discord, profileData) {
        let gifs = [
            'https://media1.tenor.com/images/ecfbb852d71e4aee31453d6b21281c16/tenor.gif?itemid=22029090',
            'https://media.tenor.com/images/0978ab200183c86a3597537a341b5852/tenor.gif',
            'https://media.tenor.com/images/12e5d2f27bee47c0cf66892c5ff6e510/tenor.gif',
            'https://media.tenor.com/images/c1dcf65526afeb3761a7a62887000318/tenor.gif'
        ]

        let randomImage = randomNumber(0, gifs.length - 1);

        const newEmbed = new Discord.MessageEmbed()
        .setColor('#9CCFE7')
        .setAuthor(`Thanks for using Elle's Command! Now you owe Elle 50k!`,
        `${message.author.avatarURL({dynamic: true})}`)
        .setImage(`${gifs[randomImage]}`)
        .setFooter('Created by bfan#0125')

        return message.channel.send(newEmbed);
    }
}