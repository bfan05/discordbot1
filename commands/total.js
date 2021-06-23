const profileModel = require("../models/profileSchema");

module.exports = {
    name: 'total',
    aliases: [],
    permissions: [],
    description: 'Check the TMC Cash leaderboard!',
    
    async execute(client, message, args, Discord, profileData) {
        profileModel.find({
            lb: 'all',
        }).sort([
            ['coins', 'descending']
        ]).exec((err, res) => {
            if (err) console.log(err);
            var page = Math.ceil(res.length / 10);
            
            let embed = new Discord.MessageEmbed();
            embed.setTitle("Leaderboard");
            embed.setThumbnail('http://www.simpleimageresizer.com/_uploads/photos/fd03d8aa/tmc_2_15.gif');

            let pg = parseInt(args[0]);
            if (pg != Math.floor(pg)) pg = 1;
            if (!pg) pg = 1;
            let end = pg * 10;
            let start = (pg * 10) - 10;

            if (res.length === 0) {
                embed.addField("Error", "No pages found!");
            } else if (res.length <= start) {
                embed.addField("Error", "No pages found!");
            } else if (res.length <= end) {
                embed.setFooter(`page ${pg} of ${page}`)
                for (i = start; i < end; i++) {
                    embed.addField(`${i + 1}. ${res[i].usernm}`, `${res[i].coins.toLocaleString()}`);
                }
            } else {
                embed.setFooter(`page ${pg} of ${page}`)
                for (i = start; i < end; i++) {
                    embed.addField(`${i + 1}. ${res[i].usernm}`, `${res[i].coins.toLocaleString()}`);
                }
            }
            message.channel.send(embed);
        })
    }
}


/*module.exports = {
    name: 'total',
    aliases: [],
    permissions: [],
    description: 'Check the total TMC Cash in circulation.',
    async execute(client, message, args, Discord, profileData) {
        profileModel.find({
            lb: 'all'
        }).sort([
            ['coins', 'descending']
        ])

        profileModel.find().sort({coins: -1}).fetch(function(err, result) {
            if (err) throw err;
            console.log(result);
        })
        profileModel.find({}).sort({coins: -1});
        const response = await profileModel.find().then((data) => {
            data.forEach((prof) => {
                message.channel.send(`**${prof.usernm}** currently has **${prof.coins}** TMC Cash!`);
            });
        }); 
    }
}*/