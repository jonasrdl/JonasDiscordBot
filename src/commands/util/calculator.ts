import { Command } from '../../structures/Command'
import { MessageEmbed } from 'discord.js'

export default new Command({
  name: 'calculator',
  description: 'calculate two numbers',
  options: [
    {
      name: 'calculation',
      description: 'Calculation you wanna make',
      type: 'STRING',
      required: true,
    },
  ],
  run: async ({ interaction }) => {
    const calculation = interaction.options.getString('calculation')
    const calculationArr = calculation.split(' ')
    const firstNumber = calculationArr[0]
    const operator = calculationArr[1]
    const secondNumber = calculationArr[2]

    let result

    if (firstNumber.includes('(') || firstNumber.includes(')')) {
      const embed = new MessageEmbed()
        .setColor('#b60707')
        .setTitle('Special characters are not yet implemented.')
        .setTimestamp()

      return interaction.followUp({ embeds: [embed] })
    }

    switch (operator) {
      case '+':
        result = Number(firstNumber) + Number(secondNumber)
        break
      case '-':
        result = Number(firstNumber) - Number(secondNumber)
        break
      case '/':
        if (Number(secondNumber) === 0) {
          const embed = new MessageEmbed()
            .setColor('#b60707')
            .setTitle('Division by 0 is invalid.')
            .setTimestamp()

          return interaction.followUp({ embeds: [embed] })
        }

        result = Number(firstNumber) / Number(secondNumber)
        break
      case '*':
        result = Number(firstNumber) * Number(secondNumber)
        break
      default:
        const embed = new MessageEmbed()
          .setColor('#b60707')
          .setTitle('Invalid operator, try again!')
          .setTimestamp()

        return interaction.followUp({ embeds: [embed] })
    }

    const embed = new MessageEmbed()
      .setColor('#1f5e87')
      .setTitle(String(result))
      .setTimestamp()

    return interaction.followUp({ embeds: [embed] })
  },
})
