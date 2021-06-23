module.exports = () => {
    console.log('SigmaBot is online!');
    client.user.setPresence({
        status: "online",
        game: {
            name: "type -help for help!",
            type: "WATCHING"
        }
    });
}