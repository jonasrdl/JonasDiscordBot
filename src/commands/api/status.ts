import { Command } from '../../structures/Command'
import { MessageEmbed } from 'discord.js'
const fetch = require('node-fetch')
const URL = 'http://status.jonasriedel.com/api/website'

export default new Command({
  name: 'status',
  description: 'Check if services are online',
  run: async ({ client, interaction }) => {
    fetch(URL)
      .then((data) => {
        if (data.status === 200) {
          const successEmbed = new MessageEmbed()
            .setColor('#1f5e87')
            .setTitle('Status')
            .addField('Website', 'Online  ✔️', false)
            .setTimestamp()

          interaction.followUp({ embeds: [successEmbed] })
        } else {
          const failEmbed = new MessageEmbed()
            .setColor('#1f5e87')
            .setTitle('Status')
            .addField('Website', 'Offline  ❌', false)
            .setTimestamp()

          interaction.followUp({ embeds: [failEmbed] })
        }
      })
      .catch((error) => {
        console.log(error)

        const failEmbed = new MessageEmbed()
          .setColor('#1f5e87')
          .addField('Error', error, false)
          .setTimestamp()

        interaction.followUp({ embeds: [failEmbed] })
      })
  },
})
