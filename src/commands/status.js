const { MessageEmbed } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')
const { guildId } = require('../config.json')
const fetch = require('node-fetch')
const URL = 'http://status.jonasriedel.com/api/website'

module.exports = {
  data: new SlashCommandBuilder().setName('status').setDescription('Check if services are online'),
  async execute(interaction, client) {
    fetch(URL)
      .then((data) => {
        if (data.status === 200) {
          const successEmbed = new MessageEmbed()
            .setColor('#1f5e87')
            .setTitle('Status')
            .addField('Website', 'Online  ✔️', false)
            .setTimestamp()

          interaction.reply({ embeds: [successEmbed] })
        } else {
          const failEmbed = new MessageEmbed()
            .setColor('#1f5e87')
            .setTitle('Status')
            .addField('Website', 'Offline  ❌', false)
            .setTimestamp()

          interaction.reply({ embeds: [failEmbed] })
        }
      })
      .catch((error) => {
        console.log(error)

        const failEmbed = new MessageEmbed()
          .setColor('#1f5e87')
          .addField('Error', error, false)
          .setTimestamp()

        interaction.reply({ embeds: [failEmbed] })
      })
  },
}
