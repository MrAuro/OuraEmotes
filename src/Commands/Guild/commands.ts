import { Command } from '../../Interfaces';
import * as Discord from 'discord.js';

export const command: Command = {
    name: 'commands',
    aliases: [],
    description: 'View all of the available commands',
    usage: '$commands',
    run: async (client, message, args) => {
        let commandsEmbed = new Discord.MessageEmbed()
            .setColor('#5DFF35')
            .setTitle('Commands')
            .setDescription('Below are all of the command available with the bot. Each command has a 5 second cooldown.');
        client.commands.forEach((command) => {
            if (command.name === 'eval') return;
            commandsEmbed.addField(command.name, `\`${command.usage}\`\n${command.description} | Aliases: ${command.aliases.map((a) => `\`${a}\``).join(' ')}`);
        });

        commandsEmbed.setTimestamp().setFooter(`Requested by ${message.author.username}`);

        message.channel.send(commandsEmbed);
    },
};
