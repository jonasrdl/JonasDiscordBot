const Discord = require('discord.js');
const client = new Discord.Client();
let prefix = '.';

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

module.exports = {
  name: 'info',
  description: 'General info about the Bot',
  execute(client, message, args, Discord) {
    let infoEmbed = new Discord.MessageEmbed()
      .setColor('#1f5e87')
      .setTitle('Information')
      .addField('Project start', '1. March 2021', false)
      .addField('Serious project?', 'No, obv its fun.', false)
      .addField('Need help?', prefix + 'help', false)
      .addField('Who made me?', prefix + 'author', false)
      .addField('Uptime', uptime(), false)
      .setTimestamp();

    message.channel.send(infoEmbed);
  },
};