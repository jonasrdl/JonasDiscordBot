import { Command } from '../../structures/Command';
import { TextChannel, MessageEmbed } from 'discord.js';
import { client } from '../..';

export default new Command({
  name: 'poll',
  description: 'Start a poll',
  options: [
    {
      name: 'question',
      description: 'Question',
      type: 'STRING',
      required: true,
    },
  ],
  run: async ({ interaction }) => {
    let question = interaction.options.getString('question');
    const channel = await client.channels.fetch(interaction.channelId);

    question.includes('?') ? question : (question = `${question}?`);

    const embed = new MessageEmbed()
      .setColor('#1f5e87')
      .setTitle(`${question}`)
      .setTimestamp();

    (channel as TextChannel)
      .send({ embeds: [embed] })
      .then((message) => {
        message.react('✔️');
        message.react('❌');
      })
      .catch((error) => {
        console.log(error);
        return interaction.followUp('There was an error, pleasy try again!');
      });

    return interaction.followUp('Poll started, please vote!');
  },
});
