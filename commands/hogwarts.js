const profileModel = require("../models/profileSchema");

module.exports = {
    name: 'hogwarts',
    aliases: [],
    cooldown: 10,
    permissions: [],
    description: 'Welcome to the Deathly Hallows hunt.',
    async execute(client, message, args, Discord, profileData) {
        message.author.createDM().then(dmchannel => {
            const newEmbed = new Discord.MessageEmbed()
            .setColor('#9CCFE7')
            .setAuthor(`Welcome`, `${message.author.avatarURL({dynamic: true})}`)
            .setImage('https://media1.tenor.com/images/5edf2155bf401d9321cf67a184a916bc/tenor.gif?itemid=16676324')
            .addFields(
                {name: `Welcome ${message.author.username}...`, value: `***to the Hunt for the Three Deathly Hallows. Together... these artifacts grant it's user the power to Master Death.\n\nWin and be rewarded greatly!\n\nTo get your first clue type: -cloak***`},
            )
            .setFooter('Created by bfan#0125')
            dmchannel.send(newEmbed);
        })
    }
}