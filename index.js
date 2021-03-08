const Discord = require('discord.js');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('config.json', 'utf-8'));
const client = new Discord.Client();

client.on('ready', () => {
    console.log('Bot logged in as ' + client.user.tag);
    console.log('The bot is currently on ' + client.guilds.cache.size + 'Server(s)');
});

client.on('message', (message) => {
    if (!message.member.user.bot && message.guild) {
        if (message.content === '.help') {
            message.channel.send('Hallo Welt');
        }
    }
});

client.on('message', (message) => {
    if (!message.member.user.bot && message.guild) {
        if (message.content.startsWith('.avatar')) {
            if (message.mentions.users.first()) {
                let user = message.mentions.users.first();
                let attachment = new Discord.MessageAttachment(user.avatarURL());
                message.reply(attachment);
            } else {
                let attachment = new Discord.MessageAttachment(message.member.user.avatarURL());
                message.reply(attachment);
            }
            console.log(message.member.user.tag + ' executed command .avatar');
        }
    }
});

client.login(config.token).then(r => {
    console.log('Bot ready!');
});