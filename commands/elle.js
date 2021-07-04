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
            'https://media.tenor.com/images/8fc863bbcd2eec44e4b868d10fbe9d61/tenor.gif',
            'https://media1.tenor.com/images/3e8d78df0c61ac3ec9437e6274359f93/tenor.gif?itemid=19144402',
            'https://media1.tenor.com/images/2e86d5d444afab63daf3b97177b5cd1a/tenor.gif?itemid=19298968'
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