import { Command } from '../../structures/Command'
import { MessageEmbed } from 'discord.js'
const fetch = require('node-fetch')

export default new Command({
  name: 'potd',
  description: 'NASA picture of the day',
  run: async ({ interaction }) => {
    fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_TOKEN}`
    )
      .then((response) => response.json())
      .then((data) => {
        const embed = new MessageEmbed()
          .setColor('#1f5e87')
          .setTitle('' + data.title)
          .setDescription('' + data.explanation)
          .setImage(data.hdurl)
          .setTimestamp()

        return interaction.followUp({ embeds: [embed] })
      })
  },
})
