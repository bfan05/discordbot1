const profileModel = require("../models/profileSchema");

module.exports = {
    name: 'copperkey',
    aliases: ['ckey'],
    cooldown: 10,
    permissions: [],
    description: 'Check the number of copper keys you own!',
    async execute(client, message, args, Discord, profileData) {
        const data = await profileModel.findOne({ userID: message.author.id });

        if (!args[0] && data.copperkey > 0) {
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

        else if (!args[0] && data.copperkey == 0) {
            message.channel.send(data.copperkey);

            message.author.send("You have discovered the copper key! If you want it, first answer this question: What is the Key to Beating Acererak?");
            message.author.createDM().then(dmchannel => {
                let correct = false;
                const collector = new Discord.MessageCollector(dmchannel, m => m.author.id === message.author.id, { max: 1, time: 10000 });
                collector.on('collect', message => {
                    if (message.content.toLowerCase() == "play on the left") {
                        correct = true;
                        dmchannel.send(`Congratulations! You have received a shiny copper key!`)
                    } else {
                        dmchannel.send("I'm sorry, that answer is incorrect.");
                    }
                })
                collector.on('end', collected => {
                    if (collected.size == 0) dmchannel.send("Time's up!")
                })

                if (!correct) {
                    message.channel.send('hello');
                    return;
                }
    
                const response = await profileModel.findOneAndUpdate(
                    {
                        userID: message.author.id,
                    }, 
                    {
                        $inc: {
                            copperkey: 1,
                        },
                    }
                );
                message.channel.send('updated');
            })
        }
        else {
            if (message.author.id != '777641801212493826') {
                return message.channel.send('Only the mighty Hermes may give out keys!');
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