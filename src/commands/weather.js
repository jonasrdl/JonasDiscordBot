const { MessageEmbed } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')

const isCityNumber = (interaction, city) => {
        return !isNaN(city)
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("weather")
        .setDescription("get weather")
        .addStringOption((option) => option.setName("city").setDescription("City")),
    async execute(interaction) {
        const city = interaction.options.getString("city")

        if (!isCityNumber()) {
            return interaction.reply('City is invalid, try again!')
        }

        const embed = new MessageEmbed()
          .setColor('#1f5e87')
          .setTitle(`${city}`)
          .setImage(`https://wttr.in/${city}.png`)
          .setTimestamp()

        return interaction.reply({ embeds: [embed] })
    }
}