import { Command } from '../../Interfaces';
import * as Discord from 'discord.js';

export const command: Command = {
    name: 'commands',
    aliases: [],
    run: async (client, message, args) => {
        const helpEmbed = new Discord.MessageEmbed()
            .setColor('#5CFF35')
            .setTitle('Commands')
            .setDescription('You can view a more detailed list of the commands [here](https://github.com/MrAuro/OuraEmotes#commands)')
            .addFields(
                {
                    // @ts-ignore ---- for some reason typescript doesnt like this, but the bot still works fine
                    name: 'addemote',
                    value: '`!addemote <BTTV/FFZ/Image Link> <Emote Name>`\nAdd a emote to the server`',
                    inline: 'true',
                },
                {
                    name: 'ping',
                    value: '`!ping`\nPing the bot for its latency`',
                    inline: 'true',
                },
                {
                    name: 'help',
                    value: '`!help`\nReturns help on the bot`',
                    inline: 'true',
                },
                {
                    name: 'invite',
                    value: '`!invite`\nReturns the invite link`',
                    inline: 'true',
                },
                {
                    name: 'ping',
                    value: '`!ping`\nPing the bot for its latency`',
                    inline: 'true',
                },
            )
            .setTimestamp()
            .setFooter(`Requested by ${message.author.username}`);
        message.channel.send(helpEmbed);
    },
};
