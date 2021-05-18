const Discord = require('discord.js');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('../config/config.json', 'utf-8'));
const api_token = JSON.parse(fs.readFileSync('../config/config.json', 'utf-8'));
const client = new Discord.Client();
const fetch = require('node-fetch');
const prefix = '.';

client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync('./commands/')
  .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
}

client.on('ready', () => {
  console.log('Bot logged in as ' + client.user.tag);
  console.log(
    'The bot is currently on ' + client.guilds.cache.size + ' server(s)'
  );

  client.user.setActivity('.help', { type: 'PLAYING' });
});

client.on('message', (message) => {
  message.mentions.users.first();
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'help') {
    client.commands.get('help').execute(message, args);
  } else if (command === 'avatar') {
    client.commands.get('avatar').execute(message, args);
  } else if (command === 'offend') {
    client.commands.get('offend').execute(message, args);
  } else if (command === 'time') {
    client.commands.get('time').execute(message, args);
  } else if (command === 'date') {
    client.commands.get('date').execute(message, args);
  } else if (command === 'dm') {
    client.commands.get('dm').execute(message, args);
  } else if (command === 'quote') {
    client.commands.get('quote').execute(message, args);
  } else if (command === 'temperature') {
    client.commands.get('temperature').execute(message);
  } else if (command === 'author') {
    client.commands.get('author').execute(message, args);
  } else if (command === 'info') {
    client.commands.get('info').execute(message, args);
  } else if (command === 'members') {
    client.commands.get('members').execute(message, args);
  } else if (command === 'server') {
    client.commands.get('server').execute(message, args);
  }
});

client.login(config.token).then(() => {
  console.log('Bot ready!');
});
