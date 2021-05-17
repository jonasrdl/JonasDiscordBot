const Discord = require('discord.js');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('../config/config.json', 'utf-8'));
const api_token = JSON.parse(fs.readFileSync('../config/config.json', 'utf-8'));
const client = new Discord.Client();
const fetch = require('node-fetch');
const quotes = require('../assets/quotes').quotes;
const userId = require('../config/config.json', 'utf-8');
const nickname = require('../config/config.json', 'utf-8');

let prefix = '.';

function getTime() {
  return new Date().toLocaleTimeString('de', { hour12: false });
}

function getDate() {
  return new Date().toLocaleDateString('de');
}

function uptime() {
  let days = Math.floor(client.uptime / 86400000);
  let hours = Math.floor(client.uptime / 3600000) % 24;
  let minutes = Math.floor(client.uptime / 60000) % 60;
  let seconds = Math.floor(client.uptime / 1000) % 60;

  return (
    days +
    ' Days, ' +
    hours +
    ' Hours, ' +
    minutes +
    ' Minutes, ' +
    seconds +
    ' Seconds'
  );
}

client.on('ready', () => {
  console.log('Bot logged in as ' + client.user.tag);
  console.log(
    'The bot is currently on ' + client.guilds.cache.size + ' server(s)'
  );

  client.user.setActivity('.help', { type: 'PLAYING' });
});

client.on('message', (message) => {
  if (message.content.startsWith('prefix')) {
    message.channel.send('Actual prefix: ' + prefix);
  }

  if (message.content.startsWith(prefix + 'prefix')) {
    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    if (!args.length) {
      message.channel.send(
        'No prefix given.\n Need help? ->' + prefix + 'help'
      );
      return;
    }

    prefix = args;

    message.channel.send('Prefix changed to: ' + args);
  }

  //Avatar command
  if (message.content.startsWith(prefix + 'avatar')) {
    if (message.mentions.users.first()) {
      let user = message.mentions.users.first();
      let attachment = new Discord.MessageAttachment(user.avatarURL());
      message.reply(attachment).then(() => console.log('Attachment sent'));
    } else {
      let attachment = new Discord.MessageAttachment(
        message.member.user.avatarURL()
      );
      message.reply(attachment).then(() => console.log('.avatar sent'));
    }
  }

  //Offend command
  if (message.content.startsWith(prefix + 'offend')) {
    if (!message.member.user.bot && message.guild) {
      if (message.mentions.users.first()) {
        let user = message.mentions.users.first();

        if (message.mentions.has(client.user)) {
          message.channel.send('Nice try! I can´t offend myself 😎');

          return;
        }

        message.channel
          .send(`${user}` + ' is stupid :^)')
          .then(() => console.log('.offend sent'));
      }
    }
  }

  //Time command
  if (message.content === prefix + 'time') {
    let timeEmbed = new Discord.MessageEmbed()
      .setColor('#1f5e87')
      .setTitle(getTime());

    message.channel
      .send(timeEmbed)
      .then(() => console.log('Executed .time command'));
  }

  //Date command
  if (message.content === prefix + 'date') {
    let dateEmbed = new Discord.MessageEmbed()
      .setColor('#1f5e87')
      .setTitle(getDate());

    message.channel
      .send(dateEmbed)
      .then(() => console.log('Executed .date command'));
  }

  //Dm command
  if (message.content === prefix + 'dm') {
    message.author
      .send('Hi! Its me, Jonas Bot :^)')
      .then(() => console.log('Sent private Message'));
  }

  //Quote command
  if (message.content === prefix + 'quote') {
    const randomQuote = Math.floor(Math.random() * quotes.length);

    let quoteEmbed = new Discord.MessageEmbed()
      .setColor('#1f5e87')
      .setTitle(quotes[randomQuote]);

    message.channel
      .send(quoteEmbed)
      .then(() => console.log('Executed .quote command'));
  }

  //Temperature command
  if (
    message.content.startsWith(prefix + 'temperature') ||
    message.content.startsWith(prefix + 'temp')
  ) {
    prefix = '.';

    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    if (!args.length) {
      message.channel.send(
        'No City specified.\n Need help? ->' + prefix + 'help'
      );
      return;
    }

    for (let i = 0; args.length; i++) {
      if (
        args[i].includes('ü') ||
        args[i].includes('ö') ||
        args[i].includes('ä')
      ) {
        message.channel.send('City is invalid, contains umlauts.');

        return;
      }
    }

    fetch(
      'https://api.openweathermap.org/data/2.5/weather?q=' +
        args +
        '&units=metric&appid=' +
        config.api_token
    )
      .then((response) => response.json())
      .then(
        console.log(
          'Temperature command executed, showing temperature of city: ' + args
        )
      )
      .then((data) =>
        message.channel.send(
          'The temperature in ' + args + ' is: ' + data.main.temp + '°C'
        )
      );
  }

  //Author command
  if (
    message.content === prefix + 'author' &&
    message.guild &&
    !message.member.user.bot
  ) {
    let authorEmbed = new Discord.MessageEmbed()
      .setColor('#1f5e87')
      .setTitle('Reach me on: ')
      .addField('Github', 'https://github.com/jonasrdl', false)
      .addField('Website', 'https://jonasriedel.com', false)
      .addField('Twitter', 'https://twitter.com/jvnxs7', false)
      .setTimestamp();

    message.channel
      .send(authorEmbed)
      .then(() => console.log(prefix + 'author command executed'));
  }

  //Info command
  if (
    message.content === prefix + 'info' &&
    message.guild &&
    !message.member.user.bot
  ) {
    let infoEmbed = new Discord.MessageEmbed()
      .setColor('#1f5e87')
      .setTitle('Information')
      .addField('Project start', '1. March 2021', false)
      .addField('Serious project?', 'No, obv its fun.', false)
      .addField('Need help?', prefix + 'help', false)
      .addField('Who made me?', prefix + 'author', false)
      .addField('Uptime', uptime(), false)
      .setTimestamp();

    message.channel
      .send(infoEmbed)
      .then(() => console.log(prefix + 'info command executed'));
  }

  //Members command
  if (message.content === prefix + 'members') {
    const members = message.guild.memberCount;

    let memberCountEmbed = new Discord.MessageEmbed()
      .setColor('#1f5e87')
      .addField('Members', 'This server has ' + members + ' members!');

    message.channel.send(memberCountEmbed);
  }

  //Help command
  if (
    message.content === prefix + 'help' &&
    message.guild &&
    !message.member.user.bot
  ) {
    let helpEmbed = new Discord.MessageEmbed()
      .setColor('#1f5e87')
      .setTitle('Author')
      .setURL('https://github.com/jonasrdl')
      .setAuthor(
        'Jonas',
        'https://cdn.discordapp.com/avatars/209945797918195712/a41ddfe52fdea6c1b8d88b4da5b2a7ef.png?size=128'
      )
      .setDescription('Help')
      .addField(prefix + 'prefix [prefix]', 'Change Prefix', false)
      .addField(prefix + 'offend @[Username]', 'Offend someone', false)
      .addField(prefix + 'avatar @[Username]', 'Get a users avatar', false)
      .addField(prefix + 'time', 'Get the current Time', false)
      .addField(prefix + 'date', 'Get the current Date', false)
      .addField(prefix + 'dm', 'Send yourself a private message', false)
      .addField(prefix + 'quote', 'Get a random Quote', false)
      .addField(
        prefix + 'temperature [City]',
        'Get the temperature of any city',
        false
      )
      .addField(prefix + 'author', 'Infos about the author', false)
      .addField(prefix + 'info', 'General info about the Bot', false)
      .addField(
        prefix + 'members',
        'Shows how many members are on this server',
        false
      )
      .setTimestamp();

    message.channel
      .send(helpEmbed)
      .then(() => console.log(prefix + 'help Command executed'));
  }
});

client.login(config.token).then(() => {
  console.log('Bot ready!');
});
