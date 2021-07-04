const Discord = require('discord.js');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('../config/config.json', 'utf-8'));
const client = new Discord.Client();

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command-handler', 'event-handler'].forEach((handler) => {
  require(`./handlers/${handler}`)(client, Discord);
});

do {
  client.login(config.token).then((r) => console.log('Token: ' + r + ' is valid.'));
} while (config.token ? console.log('Token is valid and existing.') : console.log('Token is invalid or not existing'));
