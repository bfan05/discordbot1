module.exports = (Discord, client) => {
    console.log('SigmaBot is online!');
    client.user.setPresence({
        status: "online",
        game: {
            name: `${client.guilds.cache.size} servers! Type -help for help.`,
            type: "WATCHING"
        }
    });
}