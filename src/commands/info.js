const { MessageEmbed, Client, Intents } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Info about the bot'),
    async execute(interaction, client) {
        const days = Math.floor(client.uptime / 86400000)
        const hours = Math.floor(client.uptime / 3600000) % 24
        const minutes = Math.floor(client.uptime / 60000) % 60
        const seconds = Math.floor(client.uptime / 1000) % 60

        const embed = new MessageEmbed()
            .setColor('#1f5e87')
            .setTitle('Information')
            .addField('Project start', '1. March 2021', false)
            .addField('Serious project?', 'I guess :^)', false)
            .addField('Need help?', '/' + 'help', false)
            .addField('Who made me?', '/' + 'author', false)
            .addField('Uptime', days + ' Days, ' + hours + ' Hours, ' + minutes + ' Minutes, ' + seconds + ' Seconds', false)
            .setTimestamp() 
        
        return interaction.reply({ embeds: [embed] })
    }
}