const profileModel = require("../models/profileSchema");

module.exports = {
    name: 'copperkey',
    aliases: ['ckey'],
    cooldown: 10,
    permissions: [],
    description: 'Check the number of copper keys you own!',
    async execute(client, message, args, Discord, profileData) {
        if (!args[0] && profileData.copperkey > 0) {
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
        else if (args[0] == 'q') {
            message.author.send("You have discovered the copper key! If you want it, first answer this question: What is the Key to Beating Acererak?");
            const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { max: 1, time: 10000 });
            console.log(collector)
            collector.on('collect', message => {
                if (message.content.toLowerCase() == "play on the left") {
                    message.channel.send(`Congratulations! You have received a shiny copper key!`)
                } else {
                    return message.channel.send("I'm sorry, that answer is incorrect.");
                }
            });
            
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

            let filter = m => m.author.id === message.author.id;
            const collector = message.channel.createMessageCollector(filter, { time: 15000 });

            collector.on('collect', m => {
	            console.log(`Collected ${m.content}`);
            });

            collector.on('end', collected => {
                console.log(`Collected ${collected.size} items`);
            });

            /*message.channel.send(`You have discovered the copper key! If you want it, first answer this question: What is the Key to Beating Acererak?`).then(() => {
            message.channel.awaitMessages(filter, {
                max: 1,
                time: 60000,
                errors: ['time']
                })
                .then(msg => {
                    if (msg.content.toLowerCase() == 'play on the left') {
                        message.channel.send(`Congratulations! You have received a shiny copper key!`)
                    } else {
                        return message.channel.send(`I'm sorry, that answer is incorrect.`)
                    }
                })
                .catch(collected => {
                    return message.channel.send(msg.content);
                });
            })
            const response = await profileModel.findOneAndUpdate(
                {
                    userID: message.author.id,
                }, 
                {
                    $inc: {
                        copperkey: 1,
                    },
                }
            );*/
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