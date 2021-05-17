const Discord = require('discord.js');

function getTime() {
  return new Date().toLocaleTimeString('de', { hour12: false });
}

module.exports = {
  name: 'time',
  description: 'Get the current Time',
  execute(message, args) {
    let timeEmbed = new Discord.MessageEmbed()
      .setColor('#1f5e87')
      .setTitle(getTime());

    message.channel.send(timeEmbed);
  },
};
