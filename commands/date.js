function date() {
  return new Date().toLocaleDateString('de');
}

module.exports = {
  name: 'date',
  description: 'Get the current Date',
  execute(client, message, args, Discord) {
    let dateEmbed = new Discord.MessageEmbed()
      .setColor('#1f5e87')
      .setTitle(date());

    message.channel.send(dateEmbed);
  },
};
