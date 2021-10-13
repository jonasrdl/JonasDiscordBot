const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders')

const getDate = () => {
    return new Date().toLocaleDateString('de')
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('date')
        .setDescription('Get todays date'),
    async execute(interaction) {
        const embed = new MessageEmbed()
            .setColor('#1f5e87')
            .setTitle(getDate())

        return interaction.reply({ embeds: [embed] })
    }
}