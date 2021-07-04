module.exports = {
  name: 'help',
  description: 'Help',
  execute(client, message, args, Discord) {
    let prefix = '.';

    let helpEmbed = new Discord.MessageEmbed()
      .setColor('#1f5e87')
      .setTitle('Author')
      .setURL('https://github.com/jonasrdl')
      .setAuthor('Jonas', 'https://cdn.discordapp.com/avatars/209945797918195712/a41ddfe52fdea6c1b8d88b4da5b2a7ef.png?size=128')
      .setDescription('Help')
      .addField(prefix + 'prefix [prefix]', 'Change Prefix', false)
      .addField(prefix + 'offend @[Username]', 'Offend someone', false)
      .addField(prefix + 'avatar @[Username]', 'Get a users avatar', false)
      .addField(prefix + 'time', 'Get the current Time', false)
      .addField(prefix + 'date', 'Get the current Date', false)
      .addField(prefix + 'dm', 'Send yourself a private message', false)
      .addField(prefix + 'quote', 'Get a random Quote', false)
      .addField(prefix + 'temperature [City]', 'Get the temperature of any city', false)
      .addField(prefix + 'author', 'Infos about the author', false)
      .addField(prefix + 'info', 'General info about the Bot', false)
      .addField(prefix + 'members', 'Shows how many members are on this server', false)
      .addField(prefix + 'calculator [number + number]', 'Calculate two numbers')
      .setTimestamp();

    message.channel.send(helpEmbed).then(() => console.log('Sent help embed.'));
  },
};
