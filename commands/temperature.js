const Discord = require('discord.js');
const fetch = require('node-fetch');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('./config/config.json', 'utf-8'));
const api_token = JSON.parse(fs.readFileSync('./config/config.json', 'utf-8'));
let prefix = '.';

module.exports = {
  name: 'temperature',
  description: 'Get the temperature of any city',
  execute(client, message, Discord) {
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
          'Temperature command executed, showing temperature of city: ' + args
        )
      )
      .then((data) =>
        message.channel.send(
          'The temperature in ' + args + ' is: ' + data.main.temp + '°C'
        )
      );
  },
};
