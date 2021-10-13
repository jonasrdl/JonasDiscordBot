const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('author')
        .setDescription('Infos about the author'),
    async execute(interaction) {
        const embed = new MessageEmbed()
            .setColor('#1f5e87')
            .setTitle('Reach me on: ')
            .addField('Github', 'https://github.com/jonasrdl', false)
            .addField('Website', 'https://jonasriedel.com', false)
            .addField('Twitter', 'https://twitter.com/jvnxs7', false)
            .addField('Keybase', 'https://keybase.io/jonasrdl', false)
            .setTimestamp();
  
        return interaction.reply({ embeds: [embed] })
    }
}