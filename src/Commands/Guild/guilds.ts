import { Command } from '../../Interfaces';

export const command: Command = {
    name: 'guilds',
    aliases: ['servers'],
    description: 'Returns how many servers the bot is currently in',
    usage: '$guilds',
    run: async (client, message, args) => {
        message.channel.send(`I am currently in **${client.guilds.cache.size}** servers!`);
    },
};
