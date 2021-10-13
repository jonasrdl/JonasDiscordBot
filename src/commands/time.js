const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders')

const getTime = () => {
    return new Date().toLocaleTimeString('de', { hour12: false })
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('time')
        .setDescription('Get time'),
    async execute(interaction) {
        const embed = new MessageEmbed()
          .setColor('#1f5e87')
          .setTitle(getTime())

        return interaction.reply({ embeds: [embed] })
    }
}