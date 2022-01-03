import { Command } from '../../structures/Command'
import { MessageEmbed } from 'discord.js'
const fetch = require('node-fetch')

export default new Command({
  name: 'corona',
  description: 'Get infos about the current corona situation.',
  run: async ({ interaction }) => {
    fetch(`http://172.17.0.1:55690/incidence`)
      .then((response) => response.json())
      .then((data) => {
        const embed = new MessageEmbed()
          .setColor('#1f5e87')
          .setTitle('7 Tage Inzidenz Karlsruhe')
          .addField('Stadtkreis', `${data.stadtkreis}`, false)
          .addField('Landkreis', `${data.landkreis}`, false)
          .setTimestamp()

        return interaction.followUp({ embeds: [embed] })
      })
      .catch((error) => {
        console.log(error)
      })
  },
})
