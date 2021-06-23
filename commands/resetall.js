const profileModel = require("../models/profileSchema");

module.exports = {
    name: 'resetall',
    aliases: ['rsall'],
    permissions: ['ADMINISTRATOR'],
    description: "Reset everyone's TMC Cash",
    async execute(client, message, args, Discord, profileData) {
        profileModel.find().then((data) => {
            data.forEach(async (prof) => {
                let profData = profileModel.findOne({ userID: prof.id });
                profileModel.findOneAndUpdate(
                    {
                        userID: prof.id,
                    }, 
                    {
                        $inc: {
                            coins: -profData.coins,
                            total: -profData.total
                        },
                    }
                );
            });
        }); 
        message.channel.send('Reset complete!');
    }
}