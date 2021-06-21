module.exports = (Discord, client, message) => {
    let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'Member');
    guildMember.roles.add(welcomeRole);
    guildMember.guild.channels.cache.get('856397188913299506').send(`welcome <@${guildMember.user.id}> to bruhphastars!`);
}