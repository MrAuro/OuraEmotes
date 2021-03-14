import { Command } from '../../Interfaces';
import * as Discord from 'discord.js';

export const command: Command = {
    name: 'version',
    aliases: ['v'],
    run: async (client, message, args) => {
        require('child_process').exec('git rev-parse HEAD', function (err, stdout) {
            const inviteEmbed = new Discord.MessageEmbed()
                .setColor('#66B66E')
                .setTitle(`Commit ${stdout.slice(0, 7)}`)
                .setURL(`https://github.com/MrAuro/OuraEmotes/commit/${stdout}`)
                .setTimestamp()
                .setFooter(`Requested by ${message.author.username}`);
            message.channel.send(inviteEmbed);
        });
    },
};
