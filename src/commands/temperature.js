const Discord = require('discord.js');
const fetch = require('node-fetch');
const fs = require('fs');
let prefix = '.';

module.exports = {
  name: 'temperature', description: 'Get the temperature of any city', execute(client, message) {
    const config = JSON.parse(fs.readFileSync('./config/config.json', 'utf-8'));
    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    prefix = '.';

    const invalidInput = (text) => {
      return message.channel.send(text);
    }

    if (!isNaN(Number(args))) {
      invalidInput('Invalid input.\n Need help? ->' + prefix + 'help');
      return;
    }

    if (!args.length) {
      invalidInput('No City specified.\n Need help? ->' + prefix + 'help')
      return;
    }

    const sendMessage = (data) => {
      if (data.main.temp >= 30) {
        message.channel.send(`The temperature in ${args} is: ${data.main.temp}°C, Its very hot :D`)
      } else {
        message.channel.send(`The temperature in ${args} is: ${data.main.temp}°C`)
      }
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${args}&units=metric&appid=${config.api_token}`)
      .then((response) => response.json())
      .then((data) => sendMessage(data))
  }
};
