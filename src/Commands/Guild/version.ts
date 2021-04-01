import { Command } from '../../Interfaces';
import * as Discord from 'discord.js';
import * as childprocess from 'child_process';

export const command: Command = {
    name: 'version',
    aliases: ['v'],
    run: async (client, message, args) => {
        childprocess.exec('git rev-parse HEAD', function (err, stdout) {
            console.table(process.versions.modules);
            const inviteEmbed = new Discord.MessageEmbed()
                .setColor('#66B66E')
                .setTitle(`Version`)
                .addFields(
                    {
                        name: `Commit`,
                        value: `[${stdout.slice(0, 7)}](https://github.com/MrAuro/OuraEmotes/commit/${stdout})`,
                        inline: true,
                    },
                    {
                        name: `Node Version`,
                        value: `[${process.version}](https://nodejs.org/en/)`,
                        inline: true,
                    }
                )
                .setTimestamp()
                .setFooter(`Requested by ${message.author.username}`);
            message.channel.send(inviteEmbed);
        });
    },
};
