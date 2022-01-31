import { Command } from '../../structures/Command';
import { MessageEmbed, version } from 'discord.js';
import os from 'os';

export default new Command({
    name: 'stats',
    description: 'Stats about the bot',
    run: async ({ client, interaction }) => {
        const days: number = Math.floor(client.uptime / 86400000);
        const hours: number = Math.floor(client.uptime / 3600000) % 24;
        const minutes: number = Math.floor(client.uptime / 60000) % 60;
        const seconds: number = Math.floor(client.uptime / 1000) % 60;

        const embed: MessageEmbed = new MessageEmbed()
            .setColor('#1f5e87')
            .setTitle('Stats')
            .addField(
                'RAM',
                `${memory(os.totalmem() - os.freemem(), false)} / ${memory(
                    os.totalmem()
                )}`,
                false
            )
            .addField('Discord.js', `v${version}`, false)
            .addField('Node.js', `${process.version}`, false)
            .addField(
                'Operating system',
                `\`\`\`md\n${os.version()}\n${os.release()}\`\`\``
            )
            .addField('CPU', `\`\`\`md\n${os.cpus()[0].model}\`\`\``)
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
            );

        return interaction.followUp({ embeds: [embed] });
    },
});

function memory(bytes = 0, r = true) {
    const gigaBytes = bytes / 1024 ** 3;
    if (gigaBytes > 1) {
        return `${gigaBytes.toFixed(1)} ${r ? 'GB' : ''}`;
    }

    const megaBytes = bytes / 1024 ** 2;
    if (megaBytes > 1) {
        return `${megaBytes.toFixed(2)} ${r ? 'MB' : ''}`;
    }

    const kiloBytes = bytes / 1024;
    if (kiloBytes > 1) {
        return `${kiloBytes.toFixed(2)} ${r ? 'KB' : ''}`;
    }

    return `${bytes.toFixed(2)} ${r ? 'B' : ''}`;
}
