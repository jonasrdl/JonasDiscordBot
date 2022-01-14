import { Command } from '../../structures/Command'
import { MessageEmbed } from 'discord.js'

function formatTimestamp(timestamp) {
  const milliseconds = timestamp * 1000
  const dateObject = new Date(milliseconds)

  return dateObject.toLocaleString('de-DE', { timeZoneName: 'short' })
}

export default new Command({
  name: 'timestamp',
  description: 'Convert a UNIX timestamp',
  options: [
    {
      name: 'timestamp',
      description: 'Timestamp you want to convert',
      type: 'STRING',
      required: true
    }
  ],
  run: async ({ interaction }) => {
    const timestamp = interaction.options.getString('timestamp')

    const embed = new MessageEmbed()
      .setColor('#1f5e87')
      .addField('Converted timestamp', `${formatTimestamp(timestamp)}`)
      .setTimestamp()

    return interaction.followUp({ embeds: [embed] })
  }
})
