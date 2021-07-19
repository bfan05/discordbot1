const profileModel = require('../../models/profileSchema');

module.exports = async(Discord, client, guildMember) => {
    let profile = await profileModel.create({
        userID: guildMember.id,
        serverID: guildMember.guild.id,
        usernm: guildMember.user.username,
        coins: 0,
        total: 0,
        dogs: 0,
    });
    profile.save();
}