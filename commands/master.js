const profileModel = require("../models/profileSchema");

module.exports = {
    name: 'master',
    aliases: [],
    cooldown: 15,
    permissions: [],
    description: 'Are you a master of death?',
    async execute(client, message, args, Discord, profileData) {
        const data = await profileModel.findOne({ userID: message.author.id });

        if (!args[0] && data.wand > 0 && data.stone > 0 && data.cloak > 0) {
            const newEmbed = new Discord.MessageEmbed()
            .setColor('#9CCFE7')
            .setAuthor(`${message.author.username} is a Master of Death`, `${message.author.avatarURL({dynamic: true})}`)
            .setImage('https://media1.tenor.com/images/1ac95bc239abff2a9b2263b856b0032f/tenor.gif?itemid=5052919')
            .setFooter('Created by bfan#0125')

            return message.channel.send(newEmbed);
        }
        else {
            message.channel.send(`**${message.author.username}** is not a master of death yet! What a fool.`)
        }
    }
}