const { MessageEmbed } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')
const fetch = require('node-fetch')
const { nasaToken } = require('../config.json')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('potd')
    .setDescription('NASA picture of the day'),
  async execute(interaction) {
    fetch (`https://api.nasa.gov/planetary/apod?api_key=${nasaToken}`)
      .then(response => response.json())
      .then(data => {
        const embed = new MessageEmbed()
          .setColor('#1f5e87')
          .setTitle('' + data.title)
          .setDescription('' + data.explanation)
          .setImage(data.hdurl)
          .setTimestamp()

          return interaction.reply({ embeds: [embed] })
      })
  }
}