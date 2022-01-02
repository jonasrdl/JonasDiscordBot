const { MessageEmbed } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')
const fetch = require('node-fetch')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('corona')
    .setDescription('Get infos about the current corona situation.'),
  async execute(interaction) {
    fetch(`http://172.17.0.1:55690/incidence`)
      .then((response) => response.json())
      .then((data) => {
        const embed = new MessageEmbed()
          .setColor('#1f5e87')
          .setTitle('7 Tage Inzidenz Karlsruhe')
          .addField('Stadtkreis', `${data.stadtkreis}`, false)
          .addField('Landkreis', `${data.landkreis}`, false)
          .setTimestamp()

        return interaction.reply({ embeds: [embed] })
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
