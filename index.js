const Discord = require('discord.js');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('config.json', 'utf-8'));
const client = new Discord.Client();

let time;

function getTime() {
    let d = new Date();
    time = d.toLocaleTimeString('de', {hour12: false});
}

setInterval(getTime, 1000);

client.on('ready', () => {
    console.log('Bot logged in as ' + client.user.tag);
    console.log('The bot is currently on ' + client.guilds.cache.size + ' server(s)');
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

client.on('message', (message) => {
    if (!message.member.user.bot && message.guild) {
        if (message.mentions.users.first()) {
            let user = message.mentions.users.first();
            message.channel.send(`${user}` + ' is stupid :^)');
        }
    }
});

client.on('message', (message) => {
    setTimeout(function () {
        if (!message.member.user.bot && message.guild) {
            if (message.content === '.time') {
                let timeEmbed = new Discord.MessageEmbed()
                    .setColor('#1f5e87')
                    .setTitle(time);

                message.channel.send(timeEmbed).then(() => console.log('Executed .time command'));
            }
        }
    }, 1000);
});

client.on('message', (message) => {
    if (message.content === '.help' && message.guild && !message.member.user.bot) {
        let helpEmbed = new Discord.MessageEmbed()
            .setColor('#1f5e87')
            .setTitle('Help Syntax')
            .setURL('https://github.com/jonasrdl')
            .setAuthor('Jonas', 'https://cdn.discordapp.com/avatars/209945797918195712/00b1d6f82c7c2525a18a1a8cb44a0ce6.png?size=128')
            .setDescription('Help')
            .addField('.offend @[Username]', 'Offend someone', false)
            .addField('.avatar @[Username]', 'Get a users avatar', false)
            .addField('.time', 'Get the current Time', false)
            .setTimestamp();

        message.channel.send(helpEmbed);
    }
});

client.login(config.token).then(() => {
    console.log('Bot ready!');
});