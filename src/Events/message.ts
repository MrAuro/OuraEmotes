import { Event, Command } from '../Interfaces';
import { Message } from 'discord.js';

const talkedRecently = new Set();
const escapeRegex = (str: string) => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

export const event: Event = {
    name: 'message',
    run: (client, message: Message) => {
        // Check if the message is either from a bot or a DM
        if (message.author.bot || !message.guild) return;

        // Check if prefix is either @bot or client.config.prefix
        // https://discordjs.guide/popular-topics/faq.html#how-do-i-add-a-mention-prefix-to-my-bot
        const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(client.config.prefix)})\\s*`);
        if(!prefixRegex.test(message.content)) return;

        const [, matchedPrefix] = message.content.match(prefixRegex);

        const args = message.content.slice(matchedPrefix.length).trim().split(/ +/g);

        const cmd = args.shift().toLowerCase();
        if (!cmd) return;
        const command = client.commands.get(cmd) || client.aliases.get(cmd);
        if (command) {
            if (talkedRecently.has(message.author.id)) {
                message.react('⏱').catch((err) => {
                    if (err.httpStatus == 403) return;
                    console.log(err);
                });
            } else {
                (command as Command).run(client, message, args);
                talkedRecently.add(message.author.id);
                setTimeout(() => {
                    talkedRecently.delete(message.author.id);
                }, 5000);
            }
        }
    },
};
