const profileModel = require("../models/profileSchema");

module.exports = {
    name: 'leaderboard',
    aliases: ['lb'],
    permissions: [],
    description: 'Check the TMC Cash leaderboard!',
    
    async execute(client, message, args, Discord, profileData) {
        profileModel.find().sort([
            ['coins', 'descending']
        ]).exec((err, res) => {
            if (err) console.log(err);
            var page = Math.ceil(res.length / 10);
            
            let embed = new Discord.MessageEmbed();
            embed.setColor('#9CCFE7');
            embed.setTitle("Leaderboard");
            embed.setThumbnail('http://www.simpleimageresizer.com/_uploads/photos/fd03d8aa/tmc_2_15.gif');

            let pg = parseInt(args[0]);
            if (pg != Math.floor(pg)) pg = 1;
            if (!pg) pg = 1;
            let end = Math.min(pg * 10, res.length);
            let start = (pg * 10) - 10;

            if (res.length === 0) {
                embed.addField("Error", "No pages found!");
            } else if (res.length <= start) {
                embed.addField("Error", "No pages found!");
            } else if (res.length <= end) {
                embed.setFooter(`page ${pg} of ${page}`)
                for (i = start; i < end; i++) {
                    embed.addField(`${i + 1}. ${res[i].usernm}`, `${res[i].coins.toLocaleString()} 𝕋`);
                }
            } else {
                embed.setFooter(`page ${pg} of ${page}`)
                for (i = start; i < end; i++) {
                    embed.addField(`${i + 1}. ${res[i].usernm}`, `${res[i].coins.toLocaleString()} 𝕋`);
                }
            }
            message.channel.send(embed);
        })
    }
}