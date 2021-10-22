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
          .then(data => data.json())
          .then(data => {
            console.log(data)
          })

        let websiteOnline

        /* const embed = new MessageEmbed()
            .setColor('#1f5e87')
            .setTitle('Server information')
            .addField('Name', `${guild.name}`, false)
            .addField('Members', `${guild.memberCount}`)
            .addField('Created at', `${guild.createdAt}`, false)
            .setImage(guild.iconURL())
            .setTimestamp();

        */    
  
        //return interaction.reply({ embeds: [embed] })
        return interaction.reply('Test')
    }
}