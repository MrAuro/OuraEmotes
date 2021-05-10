import { Command } from '../../Interfaces';
import * as Discord from 'discord.js';

export const command: Command = {
    name: 'help',
    aliases: [],
    run: async (client, message, args) => {
        const helpEmbed = new Discord.MessageEmbed()
            .setColor('#5CFF35')
            .setTitle('BTTV Emote Bot')
            .setDescription(
                `You can either @ the bot, or use the ${client.config.prefix} prefix to use commands.\nUse the \`$commands\` command to view all of the commands! All commands have a 5 second cooldown to prevent spam.`
            )
            .addFields(
                {
                    // @ts-ignore ---- for some reason typescript doesnt like this, but the bot still works fine
                    name: 'Find a problem?',
                    value: '[Create an issue!](https://github.com/MrAuro/OuraEmotes/issues/new)',
                    inline: 'true',
                },
                {
                    name: 'Contribute',
                    value: '[Contribute on Github here](https://github.com/MrAuro/OuraEmotes/)',
                    inline: 'true',
                },
                {
                    name: 'Invite',
                    value: '[Invite me here!](https://discord.com/oauth2/authorize?client_id=761088567010394142&scope=bot&permissions=1073741824)',
                    inline: 'true',
                }
            )
            .setTimestamp()
            .setFooter(`Requested by ${message.author.username}`);
        message.channel.send(helpEmbed);
    },
};
