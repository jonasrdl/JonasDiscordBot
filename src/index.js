const Discord = require('discord.js');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('../cfg/config.json', 'utf-8'));
const api_token = JSON.parse(fs.readFileSync('../cfg/config.json', 'utf-8'));
const client = new Discord.Client();
const fetch = require('node-fetch');
const quotes = [
  'Any time you try to create an Internet meme, automatic fail. Thats like the worst thing you can do.',
  'I feel in todays time, you are truly successful if a meme is based on you.',
  'Memes just show that people are engaged about something. A meme is just a little inside joke for a group of people that care about a certain thing.',
  'I have a great sense of humor, I mean even when my meme came out I reposted it. I didnt care. I was laughing, too!',
  'I dont even know what memes are, Im, like, an old person, so I dont really know what a meme is.',
  'I am so happy to be a meme.',
  'Some people only recognize me for that - aint you the meme guy?',
  'I run a meme type of account on Twitter; I know what my audience is looking for.',
];

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
  // Avatar command
  if (message.content.startsWith('.avatar')) {
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
  if (message.content.startsWith('.offend')) {
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
    if (message.content === '.time') {
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
    if (message.content === '.date') {
      let dateEmbed = new Discord.MessageEmbed()
        .setColor('#1f5e87')
        .setTitle(date);

      message.channel
        .send(dateEmbed)
        .then(() => console.log('Executed .date command'));
    }
  }

  // Dm command
  if (message.content === '.dm') {
    message.author
      .send('Hi! Ich bins, Jonas Bot :^)')
      .then(() => console.log('Sent private Message'));
  }

  // Quote Command
  if (message.content === '.quote') {
    const randomQuote = Math.floor(Math.random() * quotes.length);

    let quoteEmbed = new Discord.MessageEmbed()
      .setColor('#1f5e87')
      .setTitle(quotes[randomQuote]);

    message.channel
      .send(quoteEmbed)
      .then(() => console.log('Executed .quote command'));
  }

  //Weather Command
  if (message.content.startsWith('.temperature')) {
    prefix = '.';

    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    if (!args.length) {
      message.channel.send(
        'Keine Stadt angegeben.\nBrauchst du Hilfe? -> .help'
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
          'Die Temperatur in ' + args + ' beträgt : ' + data.main.temp + '°C'
        )
      );
  }

  // Help Embed command
  if (
    message.content === '.help' &&
    message.guild &&
    !message.member.user.bot
  ) {
    let helpEmbed = new Discord.MessageEmbed()
      .setColor('#1f5e87')
      .setTitle('Help Syntax')
      .setURL('https://github.com/jonasrdl')
      .setAuthor(
        'Jonas',
        'https://cdn.discordapp.com/avatars/209945797918195712/00b1d6f82c7c2525a18a1a8cb44a0ce6.png?size=128'
      )
      .setDescription('Help')
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
      .then(() => console.log('.help Command executed'));
  }
});

client.login(config.token).then(() => {
  console.log('Bot ready!');
});
