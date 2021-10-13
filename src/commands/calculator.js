const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders')

const validateNumbers = (number) => {
  return !isNaN(number)
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('calculator')
    .setDescription('calculate two numbers')
    .addStringOption((option) => option.setName('calculation').setDescription('Calculation you wanna make')),
  async execute(interaction) {
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

      return interaction.reply({ embeds: [embed] })
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

          return interaction.reply({ embeds: [embed] })
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

        return interaction.reply({ embeds: [embed] })
    }

    const embed = new MessageEmbed()
      .setColor('#1f5e87')
      .setTitle(String(result))
      .setTimestamp()

    return interaction.reply({ embeds: [embed] })
  }
}