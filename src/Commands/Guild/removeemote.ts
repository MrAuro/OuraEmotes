import { Command } from '../../Interfaces';

export const command: Command = {
    name: 'removeemote',
    aliases: ['remove', 'deleteemote', 'delete'],
    run: async (client, message, args) => {
        if (!message.guild.me.hasPermission('MANAGE_EMOJIS'))
            return message.channel.send(`I do not have the permission to Manage Emojis. Learn how to give me permission here: <https://mrauro.github.io/OuraEmotes/perms>`);
        if (!args[0]) return message.channel.send(`Please provide an emote to remove`);

        // https://discordapp.com/developers/docs/reference#message-formatting
        let re = /<?(a)?:?(\w{2,32}):(\d{17,19})>?/;
        if (args[0].match(re)) {
            let guildEmote = message.guild.emojis.cache.find((emote) => emote.id === re.exec(args[0])[0].split(':')[2].slice(0, -1));
            if (!guildEmote) return message.channel.send('Your first argument is not a valid guild emote');
            guildEmote
                .delete()
                .then((emote) => {
                    message.channel.send(`**Sucess!**\nThe emote \`${emote.name}\` has been removed!`);
                })
                .catch((err) => {
                    message.channel.send(`**Error:** ${err}`);
                });
        } else {
            return message.channel.send('Your first argument is not a valid guild emote');
        }
    },
};
