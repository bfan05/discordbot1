module.exports = {
    name: 'balance',
    description: 'check your balance!',
    execute(client, message, args, Discord, profileData) {
        message.channel.send(`your wallet currently has **${profileData.coins}** jj cash! your bank currently has **${profileData.bank}** jj cash!`);
    }
}