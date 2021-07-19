const profileModel = require("../models/profileSchema");

module.exports = {
    name: 'cloak',
    aliases: [],
    cooldown: 15,
    permissions: [],
    description: 'Answer the cloak question or show your cloak off!',
    async execute(client, message, args, Discord, profileData) {
        const data = await profileModel.findOne({ userID: message.author.id });

        if (!args[0] && data.cloak > 0) {
            const newEmbed = new Discord.MessageEmbed()
            .setColor('#9CCFE7')
            .setAuthor(`${message.author.username} has an invisibility cloak! Great job.`, `${message.author.avatarURL({dynamic: true})}`)
            .setImage('https://cdn.discordapp.com/attachments/855927632419094582/866507277191741450/HPGif-3.gif')
            .setFooter('Created by bfan#0125')

            return message.channel.send(newEmbed);
        }

        else if (!args[0] && data.cloak == 0) {
            let correct = false;

            message.author.createDM().then(dmchannel => {
                const newEmbed = new Discord.MessageEmbed()
                .setColor('#9CCFE7')
                .setAuthor(`Cloak`, `${message.author.avatarURL({dynamic: true})}`)
                .setImage('https://cdn.discordapp.com/attachments/855927632419094582/866507277191741450/HPGif-3.gif')
                .addFields(
                    {name: `So I see you want a cloak...`, value: `***Someone held the cloak and passed it down for many generations. He was treated as an equal by death in the end and lived a very long life.\n\nWho passed the cloak down to the last living descendant and on what day?***`},
                )
                .setFooter('Created by bfan#0125')
                dmchannel.send(newEmbed);
            })
            message.author.createDM().then(dmchannel => {
                const collector = new Discord.MessageCollector(dmchannel, m => m.author.id === message.author.id, { max: 1, time: 15000 });
                collector.on('collect', message => {
                    if (message.content.toLowerCase() == "dumbledore. christmas") {
                        correct = true;
                        dmchannel.send(`Congratulations! You are one step closer to mastering Death. You have the Cloak of Invisibility. Type -stone for the next item`)
                    } else {
                        dmchannel.send("Loser, you'll never master death! Hahahaha!");
                    }
                })
                collector.on('end', collected => {
                    if (collected.size == 0) dmchannel.send("Time's up!")
                })
            })

            setTimeout(async function(){
                if (!correct) {
                    return;
                }
    
                const response = await profileModel.findOneAndUpdate(
                    {
                        userID: message.author.id,
                    }, 
                    {
                        $inc: {
                            cloak: 1,
                        },
                    }
                );
            }, 15000)
        }
        else {
            const target = message.mentions.users.first();
            if (!target) return message.channel.send("That user does not exist!");

            if (message.author.id != '777641801212493826') {
                return message.channel.send('Only the mighty Hermes may give out a cloak!');
            }
            const targetData = await profileModel.findOne({ userID: target.id });
            if (!targetData) return message.channel.send(`This user doesn't exist in the database. Tell him or her to use the -join command!`);

            const response = await profileModel.findOneAndUpdate(
                {
                    userID: target.id,
                }, 
                {
                    $inc: {
                        cloak: 1,
                    },
                }
            );
            message.channel.send(`**${message.author.username}** gave **${target.username}** a new invisibility cloak! Spooky!`);
        }
    }
}