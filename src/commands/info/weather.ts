import { Command } from '../../structures/Command'
import { MessageEmbed } from 'discord.js'
const axios = require('axios');
const specialChars: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/

export default new Command({
  name: 'weather',
  description: 'Get weather of a city or country',
  options: [
    {
      name: 'city',
      description: 'City or country you want to get the weather',
      type: 'STRING',
      required: true,
    },
  ],
  run: async ({ interaction }) => {
    const city: string = interaction.options.getString('city')

    if (city === '') {
      const embed = new MessageEmbed()
        .setColor('#FF0000')
        .setTitle(`Invalid city, try again!`)
        .setTimestamp()

      return interaction.followUp({ embeds: [embed] })
    }

    if (!specialChars.test(city)) {
      axios.get(`https://wttr.in/${city}?format=3`)
        .then((res) => {
          return interaction.followUp(res.data);
        })
    } else {
      const embed = new MessageEmbed()
        .setColor('#FF0000')
        .setTitle(`Invalid city, try again!`)
        .setTimestamp()

      return interaction.followUp({ embeds: [embed] })
    }
  },
})
