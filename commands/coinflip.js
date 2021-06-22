function randomNumber(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
}

module.exports = {
    name: 'coinflip',
    aliases: ['cf'],
    permissions: [],
    description: 'flips a coin',
    execute(client, message, args, Discord) {
        let flip = randomNumber(1, 100);
        if (flip == 1) message.channel.send('🪙 **|** the coin lands on its **side**!');
        else if (flip % 2 == 0) message.channel.send('🪙 **|** the coin lands on **heads**!');
        else message.channel.send('🪙 **|** the coin lands on **tails**!');
    }
}