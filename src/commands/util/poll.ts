import { Command } from '../../structures/Command';
import { TextChannel } from 'discord.js';
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
    const question = interaction.options.getString('question');
    const channel = await client.channels.fetch(interaction.channelId);

    (channel as TextChannel)
      .send(question)
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
