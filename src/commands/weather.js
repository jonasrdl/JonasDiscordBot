const { Client, Collection, Intents, MessageEmbed, Guild } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')
const { weatherApiToken, guildId } = require('../config.json')
const fetch = require('node-fetch')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("weather")
        .setDescription("get weather")
        .addStringOption((option) => option.setName("city").setDescription("City")),
    async execute(interaction, client) {
        const city = interaction.options.getString("city")

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiToken}&units=metric`)
            .then(data => data.json())
            .then(data => {        
                const temperature = data.main.temp
                const temperatureFeelsLike = data.main.feels_like
                const guild = client.guilds.cache.get(guildId)
            
                const embed = new MessageEmbed()
                    .setColor('#1f5e87')
                    .setTitle(`Weather of ${city}`)
                    .addField('Temperature', `${temperature}°C`, false)
                    .addField('Feels like', `${temperatureFeelsLike}°C`, false)
                    .addField('Weather', `${data.weather[0].main}`)
                    .setTimestamp()

                return interaction.reply({ embeds: [embed] })
            })
    }
}