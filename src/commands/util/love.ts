//@ts-nocheck

import { Command } from '../../structures/Command';
import { MessageEmbed } from 'discord.js';

export default new Command({
  name: 'love',
  description: 'Calculates the love affinity you have for another person.',
  options: [
    {
      name: 'user',
      description: 'Person you want to calculate it for',
      type: 'MENTIONABLE',
      required: true,
    },
  ],
  run: async ({ interaction }) => {
    const user = interaction.options.getMentionable('user');

    const love = Math.random() * 100;
    const loveIndex = Math.floor(love / 10);
    const loveLevel = '💖'.repeat(loveIndex) + '💔'.repeat(10 - loveIndex);

    const embed = new MessageEmbed()
      .setColor('#1f5e87')
      .addField(
        `☁ ${user.user.username} loves ${interaction.member.user.username} this much:`,
        `💟 ${Math.floor(love)}%\n\n${loveLevel}`,
      )
      .setTimestamp();

    return interaction.followUp({ embeds: [embed] });
  },
});
