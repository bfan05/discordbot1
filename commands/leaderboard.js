const profileModel = require("../models/profileSchema");

module.exports = {
    name: 'leaderboard',
    aliases: ['lb'],
    permissions: [],
    description: 'Check the TMA Cash leaderboard!',
    
    async execute(client, message, args, Discord, profileData) {
        profileModel.find().sort([
            ['coins', 'descending']
        ]).exec((err, res) => {
            if (err) console.log(err);
            var page = Math.ceil((res.length - 2) / 10);
            
            let embed = new Discord.MessageEmbed();
            embed.setColor('#9CCFE7');
            embed.setTitle("Leaderboard");
            embed.setThumbnail('https://cdn.discordapp.com/emojis/857732279367761940.png?v=1');

            let pg = parseInt(args[0]);
            if (pg != Math.floor(pg)) pg = 1;
            if (!pg) pg = 1;
            let adjust = 0;
            let start = (pg * 10) - 10;
            let end = Math.min(pg * 10, res.length);
            let ostart = start;
            let oend = end;

            let idx = [];

            for (i = 0; i < end; i++) {
                if (res[i].userID == '233793523269238785' || res[i].userID == '777641801212493826' || res[i].userID == '871175705415807028') {
                    idx.push(i);
                }
            }
            for (i = 0; i < idx.length; i++) {
                if (idx[i] < start) {
                    start = Math.min(start + 1, res.length);
                    end = Math.min(end + 1, res.length);
                }
                if (idx[i] >= start && idx[i] < end) {
                    end = Math.min(end + 1, res.length);
                }
            }

            let curr = ostart;

            if (res.length === 0) {
                embed.addField("Error", "No pages found!");
            } else if (res.length <= start) {
                embed.addField("Error", "No pages found!");
            } else {
                embed.setFooter(`page ${pg} of ${page}`)
                for (i = start; i < end; i++) {
                    if (res[i].userID == '233793523269238785' || res[i].userID == '777641801212493826' || res[i].userID == '871175705415807028') {
                        continue;
                    };
                    embed.addField(`${curr + 1}. ${res[i].usernm}`, `${res[i].coins.toLocaleString()} 𝕋`);
                    ++curr;
                }
            }
            message.channel.send(embed);
        })
    }
}