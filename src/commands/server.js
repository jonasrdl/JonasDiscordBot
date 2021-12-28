const { MessageEmbed } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')
require('dotenv').config()

module.exports = {
  data: new SlashCommandBuilder().setName('server').setDescription('General server info'),
  async execute(interaction, client) {
    const guild = client.guilds.cache.get(process.env.GUILD_ID)
    const owner = guild.ownerId

    const embed = new MessageEmbed()
      .setColor('#1f5e87')
      .setTitle('Server information')
      .addField('Name', `${guild.name}`, false)
      .addField('Members', `${guild.memberCount}`)
      .addField('Created at', `${guild.createdAt}`, false)
      .setImage(guild.iconURL())
      .setTimestamp()

    return interaction.reply({ embeds: [embed] })
  }
}
