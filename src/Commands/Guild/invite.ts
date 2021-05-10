import { Command } from '../../Interfaces';
import * as Discord from 'discord.js';

export const command: Command = {
    name: 'invite',
    aliases: ['i'],
    run: async (client, message, args) => {
        const inviteEmbed = new Discord.MessageEmbed()
            .setColor('#66B66E')
            .setTitle(`Invite me to your server!`)
            .setURL('https://discord.com/oauth2/authorize?client_id=761088567010394142&scope=bot&permissions=1073741824')
            .setDescription('Add BetterTTV/FFZ Emotes directly to your Discord Server')
            .setTimestamp()
            .setFooter(`Requested by ${message.author.username}`);
        message.channel.send(inviteEmbed);
    },
};
