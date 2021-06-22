const profileModel = require('../../models/profileSchema');

module.exports = async(Discord, client, guildMember) => {
    let profile = await profileModel.create({
        userID: guildMember.id,
        serverID: guildMember.guild.id,
        coins: 10,
        total: 10,
    });
    profile.save();
    let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'Member');
    guildMember.roles.add(welcomeRole);
    guildMember.guild.channels.cache.get('856397188913299506').send(`welcome <@${guildMember.user.id}> to bruhphastars!`);
}