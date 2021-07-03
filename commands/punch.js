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
            ['gives', ' a sucker punch right in the stomach! Wham!'],
            ['punches', '! Look at them fly...'],
            ['punches', ' and knocks them out. KO!'],
            ['punches', ' right in the head! A dental implant may be in the near future...']
        ];

        let gifs = [
            'https://media1.tenor.com/images/31686440e805309d34e94219e4bedac1/tenor.gif?itemid=4790446',
            'https://i.pinimg.com/originals/8a/ab/09/8aab09880ff9226b1c73ee4c2ddec883.gif',
            'https://media1.giphy.com/media/yo3TC0yeHd53G/200.gif',
            'https://thumbs.gfycat.com/ImperfectFrightenedFoal-size_restricted.gif',
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