import { Event, Command } from '../Interfaces';
import { Message } from 'discord.js';

const talkedRecently = new Set();

export const event: Event = {
    name: 'message',
    run: (client, message: Message) => {
        if (message.author.bot || !message.guild || !message.content.startsWith(client.config.prefix)) return;

        if (talkedRecently.has(message.author.id)) {
            message.react('⏱').catch(err => {
                if(err.httpStatus == 403) return;
                console.log(err);
            })
        } else {
            const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);

            const cmd = args.shift().toLowerCase();
            if (!cmd) return;
            const command = client.commands.get(cmd) || client.aliases.get(cmd);
            if (command) (command as Command).run(client, message, args);

            talkedRecently.add(message.author.id);
            setTimeout(() => {
                talkedRecently.delete(message.author.id);
            }, 5000)
        }

    },
};