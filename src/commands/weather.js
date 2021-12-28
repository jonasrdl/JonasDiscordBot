const { Client, Collection, Intents, MessageEmbed, Guild } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')
const { weatherApiToken } = require('../config.json')
const fetch = require('node-fetch')
const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/

module.exports = {
  data: new SlashCommandBuilder()
    .setName('weather')
    .setDescription('get weather')
    .addStringOption((option) => option.setName('city').setDescription('City')),
  async execute(interaction, client) {
    const city = interaction.options.getString('city')

    if (city === '') {
      const embed = new MessageEmbed()
        .setColor('#FF0000')
        .setTitle(`Invalid city, try again!`)
        .setTimestamp()

      return interaction.reply({ embeds: [embed] })
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

          return interaction.reply({ embeds: [embed] })
        })
    } else {
      const embed = new MessageEmbed()
        .setColor('#FF0000')
        .setTitle(`Invalid city, try again!`)
        .setTimestamp()

      return interaction.reply({ embeds: [embed] })
    }
  }
}
