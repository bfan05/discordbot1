function randomNumber(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
}

module.exports = {
    name: 'coinflip',
    description: 'flips a coin',
    execute(message, args, Discord) {
        if (randomNumber(1, 2) % 2 == 0) message.channel.send('heads!');
        else message.channel.send('tails!');
    }
}