const { MessageEmbed } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')
const fetch = require('node-fetch')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('corona')
    .setDescription('Get infos about the current corona situation.'),
  async execute(interaction) {
    fetch(`http://172.17.0.1:55690/incidence/stadtkreis/`)
      .then((response) => response.json())
      .then((data) => {
        const embed = new MessageEmbed()
          .setColor('#1f5e87')
          .setTitle('Karlsruhe Inzidenz')
          .addField('Stadtkreis', data.incidence)
          .setTimestamp()

        return interaction.reply({ embeds: [embed] })
      })
      .catch((err) => {
        console.error(err)
        return interaction.reply('Something went wrong.')
      })
  }
}
