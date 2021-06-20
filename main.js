const Discord = require('discord.js');
require('dotenv').config();
const client = new Discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION"]});

const prefix = '-';

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('SigmaBot is online!');
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'command'){
        client.commands.get('command').execute(message, args, Discord);
    } else if(command == 'invite') {
        client.commands.get('invite').execute(message, args, Discord);
    } else if(command == 'coinflip') {
        client.commands.get('coinflip').execute(message, args, Discord);
    } else if(command == 'ping') {
        client.commands.get('ping').execute(message, args, Discord);
    } else if(command == 'clear') {
        client.commands.get('clear').execute(message, args, Discord);
    } else if(command == 'kick') {
        client.commands.get('kick').execute(message, args, Discord);
    } else if(command == 'ban') {
        client.commands.get('ban').execute(message, args, Discord);
    } else if(command == 'spam') {
        client.commands.get('spam').execute(message, args, Discord);
    }
});

client.login(process.env.DISCORD_TOKEN);