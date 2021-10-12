const { MessageEmbed } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("weather")
        .setDescription("get weather")
        .addStringOption((option) => option.setName("city").setDescription("City")),
    async execute(interaction) {
        const city = interaction.options.getString("city")
        
        const embed = new MessageEmbed()
            .setColor('#1f5e87')
            .setTitle(`${city}`)
            .setImage(`https://wttr.in/${city}.png`)
            .setTimestamp()

            return interaction.reply({ embeds: [embed] })
        }
    }









/* const makeCall = (callback) => {
    axios.get(`${API}/Karlsruhe`).then((response) => {
        console.log(response.data);

        callback(schlumpfLink)
    })
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('weather')
        .setDescription('Get weather for a city'),
    async execute(interaction) {


        return interaction.reply()
    }
} */