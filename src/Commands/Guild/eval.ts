import { Command } from '../../Interfaces';

export const command: Command = {
    name: 'eval',
    aliases: ['e'],
    description: 'Evaluates code',
    usage: '$eval <Code>',
    run: async (client, message, args) => {
        if (message.author.id !== client.config.ownerID) return;
        try {
            const code = args.join(' ');
            let evaled = eval(code);

            if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);

            message.channel.send(clean(evaled), { code: 'xl' });
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
    },
};

// https://github.com/AnIdiotsGuide/discordjs-bot-guide/blob/master/examples/making-an-eval-command.md
function clean(text) {
    if (typeof text === 'string') return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
    else return text;
}
