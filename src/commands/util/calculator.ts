import { Command } from '../../structures/Command';
import { MessageEmbed } from 'discord.js';

export default new Command({
  name: 'calculator',
  description: 'calculate two numbers',
  options: [
    {
      name: 'firstnumber',
      description: 'First number',
      type: 'NUMBER',
      required: true,
    },
    {
      name: 'operator',
      description: 'Operator',
      type: 'STRING',
      required: true,
    },
    {
      name: 'secondnumber',
      description: 'Second number',
      type: 'NUMBER',
      required: true,
    },
  ],
  run: async ({ interaction }) => {
    const firstNumber = interaction.options.getNumber('firstnumber');
    const secondNumber = interaction.options.getNumber('secondnumber');
    const operator = interaction.options.getString('operator');

    let result;

    switch (operator) {
      case '+':
        result = Number(firstNumber) + Number(secondNumber);
        break;
      case '-':
        result = Number(firstNumber) - Number(secondNumber);
        break;
      case '/':
        if (Number(secondNumber) === 0) {
          const embed = new MessageEmbed()
            .setColor('#b60707')
            .setTitle('Division by 0 is invalid.')
            .setTimestamp();

          return interaction.followUp({ embeds: [embed] });
        }

        result = Number(firstNumber) / Number(secondNumber);
        break;
      case '*':
        result = Number(firstNumber) * Number(secondNumber);
        break;
      default:
        const embed = new MessageEmbed()
          .setColor('#b60707')
          .setTitle('Invalid operator, try again!')
          .setTimestamp();

        return interaction.followUp({ embeds: [embed] });
    }

    const embed = new MessageEmbed()
      .setColor('#1f5e87')
      .setTitle(
        `${firstNumber} ${operator} ${secondNumber} = ${String(result)}`,
      )
      .setTimestamp();

    return interaction.followUp({ embeds: [embed] });
  },
});
