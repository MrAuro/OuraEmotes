import { Command } from '../../Interfaces';
import * as Discord from 'discord.js';
import os from 'os';
import * as si from 'systeminformation';

export const command: Command = {
    name: 'info',
    aliases: [],
    run: async (client, message, args) => {
        let valueObject = {
            cpu: 'manufacturer, brand, cores, physicalCores',
            mem: 'total, free',
            cpuCurrentSpeed: 'avg',
            cpuTemperature: 'main',
            osInfo: 'platform',
        };

        let siData = await si.get(valueObject);

        const inviteEmbed = new Discord.MessageEmbed()
            .setColor('#66B66E')
            .setTitle(`Info`)
            .addFields(
                {
                    name: `🖥 Platform`,
                    value: `${siData.osInfo.platform}`,
                    inline: true,
                },
                {
                    name: `⏰ Server Uptime`,
                    value: `${Math.round(os.uptime() / 60)} minutes`,
                    inline: true,
                },
                {
                    name: `🧠 Memory Usage`,
                    value: `${formatBytes(os.freemem())} of ${formatBytes(os.totalmem())}`,
                    inline: true,
                },
                {
                    name: `⏳ CPU Information`,
                    value: `${siData.cpu.manufacturer} ${siData.cpu.brand}`,
                },
                {
                    name: `🔢 CPU Cores`,
                    value: `${siData.cpu.cores} cores and ${siData.cpu.physicalCores} physical cores at ${siData.cpuCurrentSpeed.avg}GHz`,
                },
                {
                    name: `🔥 CPU Tempurature`,
                    value: `${siData.cpuTemperature.main}°C`,
                }
            )
            .setTimestamp()
            .setFooter(`Requested by ${message.author.username}`);
        message.channel.send(inviteEmbed);
    },
};

// https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
