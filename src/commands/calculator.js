const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('calculator')
        .setDescription('calculate two numbers')
        .addStringOption(option => option
            .setName('firstnumber')
            .setDescription('First number'))
        .addStringOption(option => option
            .setName('operator')
            .setDescription('Operator'))
      .addStringOption(option => option
            .setName('secondnumber')
            .setDescription('Second number')),
    async execute(interaction) {
        const firstNumber = interaction.options.getString('firstnumber')
        const operator = interaction.options.getString('operator')
        const secondNumber = interaction.options.getString('secondnumber')

        if (operator === '+') {
            return interaction.reply(Number(firstNumber) + Number(secondNumber))
          } else if (operator === '-') {
            return interaction.reply(Number(firstNumber) - Number(secondNumber))
          } else if (operator === '/') {
            if (secondNumber === 0) {
              message.channel.send('Division by 0 is not allowed!' + ' 🧠🤓');
              return;
            }
      
            return interaction.reply(Number(firstNumber) / Number(secondNumber))
          } else if (operator === '*') {
            return interaction.reply(Number(firstNumber) * Number(secondNumber))
          }
    }
}