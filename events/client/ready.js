module.exports = (Discord, client) => {
    console.log('SigmaBot is online!');
    client.user.setActivity(`The Merchant's Corner! -help`, { type: 'WATCHING' });
}