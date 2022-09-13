import { Command } from '../../structures/Command';
import { MessageEmbed } from 'discord.js';

export default new Command({
  name: 'author',
  description: 'get information about the bot author',
  run: async ({ interaction }) => {
    const embed: MessageEmbed = new MessageEmbed()
      .setColor('#1f5e87')
      .setTitle('Reach me on: ')
      .addField('Github', 'https://github.com/jonasrdl', false)
      .addField('Website', 'https://jonasriedel.com', false)
      .addField('Twitter', 'https://twitter.com/jvnxs7', false)
      .addField('Keybase', 'https://keybase.io/jonasrdl', false)
      .setThumbnail('https://avatars.githubusercontent.com/u/76961402?v=4')
      .setTimestamp();

    return interaction.followUp({ embeds: [embed] });
  },
});
