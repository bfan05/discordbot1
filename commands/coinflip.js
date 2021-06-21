function randomNumber(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
}

module.exports = {
    name: 'coinflip',
    description: 'flips a coin',
    execute(client, message, args, Discord) {
        let flip = randomNumber(1, 100);
        if (flip >= 1 && flip < 21) message.channel.send('the coin lands on its side!');
        else if (flip % 2 == 0) message.channel.send('heads!');
        else message.channel.send('tails!');
    }
}