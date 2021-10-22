const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders')
const { guildId } = require('../config.json')
const fetch = require('node-fetch')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('status')
        .setDescription('Check if services are online'),
    async execute(interaction, client) {
        fetch('http://status.jonasriedel.com/api/website')
          .then(data => {
            if (data.status === 200) {
              const successEmbed = new MessageEmbed()
                .setColor('#1f5e87')
                .setTitle('Status')
                .addField('Website', 'Online ✔️', false)
                .setTimestamp();

                interaction.reply({ embeds: [successEmbed] })
            } else {
              const failEmbed = new MessageEmbed()
                .setColor('#1f5e87')
                .setTitle('Status')
                .addField('Website', 'Offline ❌', false)
                .setTimestamp();

                interaction.reply({ embeds: [failEmbed] })
            }
          })
    }
}