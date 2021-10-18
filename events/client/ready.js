module.exports = (Discord, client) => {
    console.log('SigmaBot is online!');
    client.user.setActivity(`The Merchant's Alley! -help`, { type: 'WATCHING' });
}