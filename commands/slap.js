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

        const target = message.mentions.users.first();
        if (!target) return message.channel.send("That user does not exist!");

        let random = randomNumber(0, values.length - 1);

        const newEmbed = new Discord.MessageEmbed()
        .setColor('#9CCFE7')
        .setAuthor(`${message.author.username} ${values[random][0]} ${target.username}${values[random][1]}`,
        `${message.author.avatarURL({dynamic: true})}`)
        .setImage('https://i.pinimg.com/originals/fe/39/cf/fe39cfc3be04e3cbd7ffdcabb2e1837b.gif')
        .setFooter('Created by bfan#0125')

        return message.channel.send(newEmbed);
    }
}