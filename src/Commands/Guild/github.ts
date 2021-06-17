import { Command } from '../../Interfaces';
import * as Discord from 'discord.js';

export const command: Command = {
    name: 'github',
    aliases: ['gh'],
    description: 'Returns the GitHub repository',
    usage: '$github',
    run: async (client, message, args) => {
        const ghEmbed = new Discord.MessageEmbed()
            .setColor('#5CFF35')
            .setTitle('Github Repository')
            .setDescription('Want to look at the source code or contribute? Visit the GitHub [here](https://github.com/MrAuro/OuraEmotes)')
            .setTimestamp()
            .setFooter(`Requested by ${message.author.username}`);
        message.channel.send(ghEmbed);
    },
};
