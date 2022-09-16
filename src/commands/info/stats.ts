import { Command } from '../../structures/Command';
import { MessageEmbed, version } from 'discord.js';
import os from 'os';
import { memory, convertTime } from '../../util/Util';

export default new Command({
  name: 'stats',
  description: 'Stats about the host',
  run: async ({ client, interaction }) => {
    const embed: MessageEmbed = new MessageEmbed()
      .setColor('#1f5e87')
      .setTitle('Stats about host')
      .addField(
        'RAM',
        `${memory(os.totalmem() - os.freemem(), false)} / ${memory(
          os.totalmem(),
        )}`,
        false,
      )
      .addField('Discord.js', `v${version}`, false)
      .addField('Node.js', `${process.version}`, false)
      .addField('Operating system', `${process.platform}`)
      .addField('Kernel', `${os.release()}`)
      .addField('Architecture', `${os.arch()}`)
      .addField('Hostname', `${os.hostname()}`)
      .addField(
        'Average load time',
        `1min: ${os.loadavg()[0]}\n 5min: ${os.loadavg()[1]}\n 15min: ${
          os.loadavg()[2]
        }
            `,
      )
      .addField('CPU', `${os.cpus()[0].model}`)
      .addField('Uptime', `${convertTime(os.uptime())}`);

    return interaction.followUp({ embeds: [embed] });
  },
});
