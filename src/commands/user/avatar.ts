import { Command } from '../../structures/Command';
import { GuildMember, MessageEmbed } from 'discord.js';

export default new Command({
  name: 'avatar',
  description: 'get avatar of a user',
  options: [
    {
      name: 'target',
      description: 'Person to get their avatar',
      type: 'MENTIONABLE',
      required: true,
    },
  ],
  run: async ({ interaction }) => {
    const user = interaction.options.getMentionable('target');

    if (user instanceof GuildMember) {
      const embed = new MessageEmbed()
        .setColor('#1f5e87')
        .setTitle('Avatar')
        .setImage(user.user.displayAvatarURL({ dynamic: true, size: 512 }))
        .setTimestamp();

      return interaction.followUp({ embeds: [embed] });
    }
  },
});
