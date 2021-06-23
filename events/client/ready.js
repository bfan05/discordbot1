module.exports = (Discord, client) => {
    console.log('SigmaBot is online!');
    client.user.setActivity(`${client.guilds.cache.size} servers! Type -help for help.`, { type: 'WATCHING' });
}