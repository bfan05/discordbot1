require('dotenv').config();

const cooldowns = new Map();

const profileModel = require('../../models/profileSchema');
module.exports = async (Discord, client, message) => {
    const prefix = process.env.bot_prefix;

    if (message.channel.id === '814695770217119794' && (message.content.includes('Beep Boop. Please DM me') || message.content.includes('Please complete your captcha'))) {
        let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
        let memberTarget = message.guild.members.cache.get('692851547062665317');
        memberTarget.roles.add(muteRole);
        message.channel.send(`**bfan** has been muted`);
        memberTarget.createDM().then(dmchannel => {
            dmchannel.send('solve captcha bud!');
        })
    }

    if (message.author.id === '717195813272682537' && message.content === 'k') {
        message.react('<:wjts:746217278604836876>')
    }

    if (message.author.id === '692851547062665317') {
        message.channel.send('stfu redlotus go play terraria');
        message.react('<:ssk:746587001431785554>');
        message.react('<:ssk2:769428718593507338>');
        message.react('<:ssk3:774835067502985237>');
        message.react('<:sskbeard:850908039485063169>');
        message.react('<:ssk6:868622638405271612>');
        message.react('<a:sskbeard_pat:853775990635757579>');
    }

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    let profileData;
    try {
        profileData = await profileModel.findOne({ userID: message.author.id });
        if (!profileData) {
            let profile = await profileModel.create({
                userID: message.author.id,
                serverID: message.guild.id,
                usernm: message.author.username,
                coins: 0,
                total: 0,
                dogs: 0,
                cloak: 0,
                stone: 0,
                wand: 0,
                master: 0,
            });
            profile.save();
        }
    } catch (err) {
        console.log(err)
    }

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    /*if (message.author.id != '692851547062665317' && message.author.id != '777641801212493826') {
        return message.channel.send('New features are being added to the bot! Please be patient, it will be back up soon.')
    }*/

    if (message.author.id == '871175705415807028') {
        return message.channel.send('You have been banned.');
    }

    if (message.guild.id != '746211731499384863' && message.guild.id != '855927632419094579' && message.guild.id != '827223677049110548' && message.guild.id != '831626733450166273') {
        return message.channel.send('Invalid server.')
    }

    /*client.guilds.cache.forEach(guild => {
        console.log(`${guild.name} | ${guild.id}`);
    })*/

    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));

    if (!command) message.reply("this command doesn't exist!");
    else {
        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Discord.Collection());
        }
    
        const current_time = Date.now();
        const time_stamps = cooldowns.get(command.name);
        const cooldown_amount = (command.cooldown) * 1000;
    
        if (time_stamps.has(message.author.id)) {
            const expiration_time = time_stamps.get(message.author.id) + cooldown_amount;
    
            if (current_time < expiration_time) {
                const time_left = Math.floor((expiration_time - current_time) / 1000);
                const hours_left = Math.floor(time_left / 3600);
                const minutes_left = Math.floor((time_left - 3600 * hours_left) / 60);
                const seconds_left = Math.floor((time_left - (3600 * hours_left + 60 * minutes_left)));
                
                if (cmd == 'daily') {
                    return message.channel.send(`**${message.author.username}**, your daily is not ready! Daily resets at **12:00 AM PST** every day.`);
                } else {
                    return message.channel.send(`**${message.author.username}**, please wait **${seconds_left}** seconds before using that command again!`);
                }
                
            }
        }
    
        time_stamps.set(message.author.id, current_time);
        setTimeout(() => time_stamps.delete(message.author.id), cooldown_amount);
    
        const validPermissions = [
            "CREATE_INSTANT_INVITE",
            "KICK_MEMBERS",
            "BAN_MEMBERS",
            "ADMINISTRATOR",
            "MANAGE_CHANNELS",
            "MANAGE_GUILD",
            "ADD_REACTIONS",
            "VIEW_AUDIT_LOG",
            "PRIORITY_SPEAKER",
            "STREAM",
            "VIEW_CHANNEL",
            "SEND_MESSAGES",
            "SEND_TTS_MESSAGES",
            "MANAGE_MESSAGES",
            "EMBED_LINKS",
            "ATTACH_FILES",
            "READ_MESSAGE_HISTORY",
            "MENTION_EVERYONE",
            "USE_EXTERNAL_EMOJIS",
            "VIEW_GUILD_INSIGHTS",
            "CONNECT",
            "SPEAK",
            "MUTE_MEMBERS",
            "DEAFEN_MEMBERS",
            "MOVE_MEMBERS",
            "USE_VAD",
            "CHANGE_NICKNAME",
            "MANAGE_NICKNAMES",
            "MANAGE_ROLES",
            "MANAGE_WEBHOOKS",
            "MANAGE_EMOJIS",
        ]
    
        if (command.permissions.length) {
            let invalidPerms = [];
            for (const perm of command.permissions) {
                if (!validPermissions.includes(perm)) {
                    return console.log(`Invalid Perm ${perm}`);
                }
                if (!message.member.hasPermission(perm)) {
                    invalidPerms.push(perm);
                    break;
                }
            }
            if (invalidPerms.length) {
                return message.channel.send(`Missing permissions: \`${invalidPerms}\``);
            }
        }
        try {
            command.execute(client, message, args, Discord, profileData);
        } catch (err) {
            console.log(err);
            message.reply("There was a problem using that command!");
        }
        
    }
}