const profileModel = require("../models/profileSchema");

module.exports.execute = async(client, message, args, Discord) => {
    message.channel.send("hello");
}

module.exports.help = {
    name: 'total',
    aliases: [],
    permissions: [],
    description: 'Check the TMC Cash leaderboard!',
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