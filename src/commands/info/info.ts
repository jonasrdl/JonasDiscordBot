import { Command } from '../../structures/Command'
import { MessageEmbed } from 'discord.js'

export default new Command({
  name: 'info',
  description: 'Info about the bot',
  run: async ({ client, interaction }) => {
    const days: number = Math.floor(client.uptime / 86400000)
    const hours: number = Math.floor(client.uptime / 3600000) % 24
    const minutes: number = Math.floor(client.uptime / 60000) % 60
    const seconds: number = Math.floor(client.uptime / 1000) % 60

    const embed: MessageEmbed = new MessageEmbed()
      .setColor('#1f5e87')
      .setTitle('Information')
      .addField('Project start', '1. March 2021', false)
      .addField('Serious project?', 'I guess :^)', false)
      .addField('Need help?', '/' + 'help', false)
      .addField('Who made me?', '/' + 'author', false)
      .addField(
        'Bot Uptime',
        days +
          ' Days, ' +
          hours +
          ' Hours, ' +
          minutes +
          ' Minutes, ' +
          seconds +
          ' Seconds',
        false
      )
      .setTimestamp()

    return interaction.followUp({ embeds: [embed] })
  },
})
