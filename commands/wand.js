const profileModel = require("../models/profileSchema");

module.exports = {
    name: 'wand',
    aliases: [],
    cooldown: 15,
    permissions: [],
    description: 'Answer the wand question or show your wand off!',
    async execute(client, message, args, Discord, profileData) {
        const data = await profileModel.findOne({ userID: message.author.id });

        if (!args[0] && data.wand > 0) {
            const newEmbed = new Discord.MessageEmbed()
            .setColor('#9CCFE7')
            .setAuthor(`${message.author.username} has a special wand! Great job.`, `${message.author.avatarURL({dynamic: true})}`)
            .setImage('https://media.discordapp.net/attachments/827223677049110552/866762172306817054/tenor.gif')
            .setFooter('Created by bfan#0125')

            return message.channel.send(newEmbed);
        }

        else if (!args[0] && data.wand == 0 && data.stone > 0 && data.cloak > 0) {
            let correct = false;

            message.author.createDM().then(dmchannel => {
                const newEmbed = new Discord.MessageEmbed()
                .setColor('#9CCFE7')
                .setAuthor(`Wand`, `${message.author.avatarURL({dynamic: true})}`)
                .setImage('https://media.discordapp.net/attachments/827223677049110552/866762172306817054/tenor.gif')
                .addFields(
                    {name: `So I see you want a wand...`, value: `***Passing from 14 owners, this particular item from the Deathly Hallows has seen a lot of blood. How long does the original owner have to be dead before you can use it? Who owned it after killing Loxias?***`},
                )
                .setFooter('Created by bfan#0125')
                dmchannel.send(newEmbed);
            })
            message.author.createDM().then(dmchannel => {
                const collector = new Discord.MessageCollector(dmchannel, m => m.author.id === message.author.id, { max: 1, time: 15000 });
                collector.on('collect', message => {
                    if (message.content.toLowerCase() == "you do not have to kill the owner. arcus or livius" || message.content.toLowerCase() == "you don't have to kill the owner. arcus or livius" || message.content.toLowerCase() == "you dont have to kill the owner. arcus or livius") {
                        correct = true;
                        dmchannel.send(`***Congratulations on gathering the Deathly Hallows. Show the complete set of items and this last command to win your prize: -master***`)
                    } else {
                        dmchannel.send("So close yet so far... better hurry up or someone else will become the master first. Incorrect!");
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
                            wand: 1,
                        },
                    }
                );
            }, 15000)
        }
        else if (!args[0] && data.wand == 0 && (data.stone == 0 || data.cloak == 0)) {
            message.author.send("You cannot get a wand before getting the stone and cloak! Come back when you are ready, fool!");
        }
        else {
            const target = message.mentions.users.first();
            if (!target) return message.channel.send("That user does not exist!");

            if (message.author.id != '777641801212493826') {
                return message.channel.send('Only the mighty Hermes may give out a wand!');
            }
            const targetData = await profileModel.findOne({ userID: target.id });
            if (!targetData) return message.channel.send(`This user doesn't exist in the database. Tell him or her to use the -join command!`);

            const response = await profileModel.findOneAndUpdate(
                {
                    userID: target.id,
                }, 
                {
                    $inc: {
                        wand: 1,
                    },
                }
            );
            message.channel.send(`**${message.author.username}** gave **${target.username}** a powerful wand!`);
        }
    }
}