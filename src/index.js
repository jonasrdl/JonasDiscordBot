const Discord = require('discord.js');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('../config/config.json', 'utf-8'));
const api_token = JSON.parse(fs.readFileSync('../config/config.json', 'utf-8'));
const client = new Discord.Client();
const fetch = require('node-fetch');
const quotes = require('./quotes').quotes;

let time;
let date;
let prefix = '.';

let d = new Date();

function getTime() {
  time = d.toLocaleTimeString('de', { hour12: false });
}

function getDate() {
  date = d.toLocaleDateString('de');
}

client.on('ready', () => {
  console.log('Bot logged in as ' + client.user.tag);
  console.log(
    'The bot is currently on ' + client.guilds.cache.size + ' server(s)'
  );
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

  // Avatar command
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

  // Offend command
  if (message.content.startsWith(prefix + 'offend')) {
    if (!message.member.user.bot && message.guild) {
      if (message.mentions.users.first()) {
        let user = message.mentions.users.first();
        message.channel
          .send(`${user}` + ' is stupid :^)')
          .then(() => console.log('.offend sent'));
      }
    }
  }

  // Time command
  setTimeout(function () {
    if (message.content === prefix + 'time') {
      let timeEmbed = new Discord.MessageEmbed()
        .setColor('#1f5e87')
        .setTitle(time);

      message.channel
        .send(timeEmbed)
        .then(() => console.log('Executed .time command'));
    }
  }, 1000);

  // Date command
  function dateCommand() {
    if (message.content === prefix + 'date') {
      let dateEmbed = new Discord.MessageEmbed()
        .setColor('#1f5e87')
        .setTitle(date);

      message.channel
        .send(dateEmbed)
        .then(() => console.log('Executed .date command'));
    }
  }

  // Dm command
  if (message.content === prefix + 'dm') {
    message.author
      .send('Hi! Its me, Jonas Bot :^)')
      .then(() => console.log('Sent private Message'));
  }

  // Quote Command
  if (message.content === prefix + 'quote') {
    const randomQuote = Math.floor(Math.random() * quotes.length);

    let quoteEmbed = new Discord.MessageEmbed()
      .setColor('#1f5e87')
      .setTitle(quotes[randomQuote]);

    message.channel
      .send(quoteEmbed)
      .then(() => console.log('Executed .quote command'));
  }

  //Weather Command
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

    fetch(
      'https://api.openweathermap.org/data/2.5/weather?q=' +
        args +
        '&units=metric&appid=' +
        config.api_token
    )
      .then((response) => response.json())
      .then(
        console.log(
          'Temperature command executed, showing temperature from ' + args
        )
      )
      .then((data) =>
        message.channel.send(
          'The temperature in ' + args + ' is: ' + data.main.temp + '°C'
        )
      );
  }

  // Help Embed command
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
      .addField('.offend @[Username]', 'Offend someone', false)
      .addField('.avatar @[Username]', 'Get a users avatar', false)
      .addField('.time', 'Get the current Time', false)
      .addField('.date', 'Get the current Date', false)
      .addField('.dm', 'Send yourself a private message', false)
      .addField('.quote', 'Get a random Quote', false)
      .addField('.temperature [City]', 'Get the temperature of any city', false)
      .setTimestamp();

    message.channel
      .send(helpEmbed)
      .then(() => console.log(prefix + 'help Command executed'));
  }
});

client.login(config.token).then(() => {
  console.log('Bot ready!');
});
