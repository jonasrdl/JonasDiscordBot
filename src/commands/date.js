const Discord = require('discord.js');

function getDate() {
  return new Date().toLocaleDateString('de');
}

module.exports = {
  name: 'date',
  description: 'Get the current Date',
  execute(message, args) {
    let dateEmbed = new Discord.MessageEmbed()
      .setColor('#1f5e87')
      .setTitle(getDate());

    message.channel.send(dateEmbed);
  },
};
