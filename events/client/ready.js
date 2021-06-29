module.exports = (Discord, client) => {
    console.log('SigmaBot is online!');
    client.user.setActivity(`${client.guilds.cache.size} servers`, { type: 'WATCHING' });
}