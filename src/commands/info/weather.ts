import { Command } from '../../structures/Command'
import { MessageEmbed } from 'discord.js'
const fetch = require('node-fetch')
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
    const city = interaction.options.getString('city')

    if (city === '') {
      const embed = new MessageEmbed()
        .setColor('#FF0000')
        .setTitle(`Invalid city, try again!`)
        .setTimestamp()

      return interaction.followUp({ embeds: [embed] })
    }

    if (!specialChars.test(city)) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_TOKEN}&units=metric`
      )
        .then((data) => data.json())
        .then((data) => {
          const temperature = data.main.temp
          const temperatureFeelsLike = data.main.feels_like

          const embed = new MessageEmbed()
            .setColor('#1f5e87')
            .setTitle(`Weather of ${city}`)
            .addField('Temperature', `${temperature}°C`, false)
            .addField('Feels like', `${temperatureFeelsLike}°C`, false)
            .addField('Weather', `${data.weather[0].main}`)
            .setTimestamp()

          return interaction.followUp({ embeds: [embed] })
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
