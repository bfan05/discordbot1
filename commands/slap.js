const profileModel = require("../models/profileSchema");

function randomNumber(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
}

module.exports = {
    name: 'slap',
    aliases: [''],
    permissions: [],
    description: 'Slap someone.',
    async execute(client, message, args, Discord, profileData) {
        if (!args.length) return message.channel.send('You need to mention a member to punch them!');

        let values = [
            ['slaps', ' right in the face! Someone\'s been a meanie!'],
            ['gives', ' a big slap. Ouch! It looks bruised...'],
            ['slaps', ' with a fly swatter! That\'s definitely going to leave a mark...'],
        ];

        let gifs = [
            'https://i.pinimg.com/originals/fe/39/cf/fe39cfc3be04e3cbd7ffdcabb2e1837b.gif',
            'https://i.imgur.com/fm49srQ.gif',
            'http://i1280.photobucket.com/albums/a489/Lilyfied/Anime%20Gif/slapgif_zps5164a18e.gif',
            'https://i.pinimg.com/originals/68/de/67/68de679cc20000570e8a7d9ed9218cd3.gif',
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