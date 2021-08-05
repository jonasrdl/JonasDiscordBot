module.exports = {
  name: 'author',
  description: 'Infos about the author',
  execute(client, message, args, Discord) {
    let authorEmbed = new Discord.MessageEmbed().setColor('#1f5e87').setTitle('Reach me on: ').addField('Github', 'https://github.com/jonasrdl', false).addField('Website', 'https://jonasriedel.com', false).addField('Twitter', 'https://twitter.com/jvnxs7', false).setTimestamp();

    message.channel.send(authorEmbed).then(() => console.log('Author embed sent'));
  },
};
