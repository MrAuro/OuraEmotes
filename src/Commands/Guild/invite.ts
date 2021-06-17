import { Command } from '../../Interfaces';
import * as Discord from 'discord.js';

export const command: Command = {
    name: 'invite',
    aliases: [],
    description: 'Sends an invite link',
    usage: '$invite',
    run: async (client, message, args) => {
        const inviteEmbed = new Discord.MessageEmbed()
            .setColor('#66B66E')
            .setTitle(`Invite me to your server!`)
            .setURL('https://discord.com/api/oauth2/authorize?client_id=761088567010394142&permissions=3288648768&scope=bot%20applications.commands')
            .setDescription('Add BetterTTV/FFZ/7TV Emotes directly to your Discord Server')
            .setTimestamp()
            .setFooter(`Requested by ${message.author.username}`);
        message.channel.send(inviteEmbed);
    },
};
