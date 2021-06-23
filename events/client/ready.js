module.exports = (Discord, client) => {
    console.log('SigmaBot is online!');
    client.user.setActivity('a game', { type: 'PLAYING' });
}