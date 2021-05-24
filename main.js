const Discord = require('discord.js');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('./config/config.json', 'utf-8'));
const client = new Discord.Client();

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command-handler', 'event-handler'].forEach((handler) => {
  require(`./handlers/${handler}`)(client, Discord);
});

client.login(config.token);
