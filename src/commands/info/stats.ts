import { Command } from '../../structures/Command';
import { MessageEmbed, version } from 'discord.js';
import os from 'os';
import Util from '../../util/Util';

export default new Command({
    name: 'stats',
    description: 'Stats about the host',
    run: async ({ client, interaction }) => {
        const days: number = Math.floor(client.uptime / 86400000);
        const hours: number = Math.floor(client.uptime / 3600000) % 24;
        const minutes: number = Math.floor(client.uptime / 60000) % 60;
        const seconds: number = Math.floor(client.uptime / 1000) % 60;

        const embed: MessageEmbed = new MessageEmbed()
            .setColor('#1f5e87')
            .setTitle('Stats about host')
            .addField(
                'RAM',
                `${Util.memory(
                    os.totalmem() - os.freemem(),
                    false
                )} / ${Util.memory(os.totalmem())}`,
                false
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
            `
            )
            .addField('CPU', `${os.cpus()[0].model}`)
            .addField('Uptime', `${Util.convertTime(os.uptime)}`);

        return interaction.followUp({ embeds: [embed] });
    },
});
