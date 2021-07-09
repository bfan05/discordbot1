const profileModel = require("../models/profileSchema");

module.exports = {
    name: 'copperkey',
    aliases: ['ckey'],
    cooldown: 10,
    permissions: [],
    description: 'Check the number of copper keys you own!',
    async execute(client, message, args, Discord, profileData) {
        if (!args[0]) {
            const newEmbed = new Discord.MessageEmbed()
            .setColor('#9CCFE7')
            .setAuthor(`${message.author.username}'s Copper Keys`, `${message.author.avatarURL({dynamic: true})}`)
            .setThumbnail('https://media.discordapp.net/attachments/829548558947844116/863063293982933032/copper_key.jpeg')
            .addFields(
                {name: 'Copper Keys:', value: `${profileData.copperkey.toLocaleString()}`},
            )
            .setFooter('Created by bfan#0125')

            return message.channel.send(newEmbed);
        }
        else {
            if (message.author.id != '777641801212493826') {
                return message.channel.send('Only the might Hermes may give out keys!');
            }
            const targetData = await profileModel.findOne({ userID: target.id });
            if (!targetData) return message.channel.send(`This user doesn't exist in the database. Tell him or her to use the -join command!`);

            const response = await profileModel.findOneAndUpdate(
                {
                    userID: target.id,
                }, 
                {
                    $inc: {
                        copperkey: 1,
                    },
                }
            );
            message.channel.send(`**${message.author.username}** gave **${target.username}** a shiny copper key!`);
        }
    }
}