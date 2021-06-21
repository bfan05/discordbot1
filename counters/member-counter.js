module.exports = async (client) => {
    const guild = client.guilds.cache.get('746211731499384863');
    setInterval(() => {
        const memberCount = guild.memberCount;
        const channel = guild.channels.cache.get('856407895535779860');
        channel.setName(`Total Members: ${memberCount.toLocaleString()}`);
        console.log('Updating Member Count');
    }, 900000);
}