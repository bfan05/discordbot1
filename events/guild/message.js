require('dotenv').config();
const profileModel = require('../../models/profileSchema');
module.exports = async (Discord, client, message) => {
    const prefix = process.env.bot_prefix;
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    let profileData;
    try {
        profileData = await profileModel.findOne({ userID: message.author.id });
        if (!profileData) {
            let profile = await profileModel.create({
                userID: message.author.id,
                serverID: message.guild.id,
                coins: 1000,
                bank: 0,
            });
            profile.save();
        }
    } catch (err) {
        console.log(err)
    }

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();
    
    const command = client.commands.get(cmd);

    try {
        command.execute(client, message, args, Discord, profileData);
    } catch (err) {
        message.reply('there was an issue executing this command!');
        console.log(err);
    }
}