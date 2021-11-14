import { Command } from '../../Interfaces';

import * as dotenv from 'dotenv';
dotenv.config();

export const command: Command = {
    name: 'addemote',
    aliases: ['ae'],
    description: 'Add an emote to the server',
    usage: `$addemote <BTTV/FFZ/Image Link/Attachment> <Emote Name>`,
    run: async (client, message, args) => {
        // Check if the bot has permission to manage emojis
        if (!message.guild.me.hasPermission('MANAGE_EMOJIS'))
            return message.reply(`I do not have the permission to Manage Emojis. Learn how to give me permission here: <https://mrauro.github.io/OuraEmotes/perms>`);

        if (!message.member.hasPermission('MANAGE_EMOJIS')) return message.channel.send(`You do not have permission to Manage Emojis.`);

        // Check if the message has at least 1 attachment
        if (message.attachments.size > 0) {
            // Use the attachment

            // Check if the emote name is valid
            if (!validEmoteName(args[0])) return message.reply('The emote name you specified is not valid! (A-Z a-z 0-9 and _)');

            message.guild.emojis
                .create(message.attachments.first().url, args[0])
                .then((emote) => {
                    message.channel.send(`**Success!\n**The emote ${client.emojis.cache.get(emote.id)} has been added!`);
                })
                .catch((err) => {
                    if (err.code === 'ETIMEDOUT') {
                        return message.channel.send(`The specified URL timed out.`);
                    } else if (err.name === 'DiscordAPIError') {
                        // check if the error INCLUDES this string, becuase the emote cap changes from guild to guild based on boosts
                        if (err.message.includes('Maximum number of emojis reached')) {
                            return message.channel.send(`This server has reached the maximum emote cap.`);
                        } else if (err.message.includes('256.0 kb')) {
                            return message.channel.send(`The file provided at the URL is too large (max 256 kb)`);
                        } else if (err.message.includes('Invalid image data')) {
                            return message.channel.send(`The specified URL does not have valid image data`);
                        } else {
                            var ownerID = client.users.cache.get(process.env.OWNERID);
                            ownerID.send(`DiscordAPI Error:\n\`${err.name} ${err.message}\`\n\nURL Provided: \`${args[0]}\` with the emote name of \`${args[1]}\` in ${message.guild.name}`);
                            return message.channel.send(`There was an error with the DiscordAPI. If this persists, please create an issue (\`$github\`)`);
                        }
                    } else {
                        var ownerID = client.users.cache.get(process.env.OWNERID);
                        ownerID.send(`Unknown Error:\n\`${err.name} ${err.message}\`\n\nURL Provided: \`${args[0]}\` with the emote name of \`${args[1]}\` in ${message.guild.name}`);
                        return message.channel.send(`There was an unknown error.`);
                    }
                });
        } else {
            // Use the URL
            let emoteUrl = args[0]?.match(/(http|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/)?.[0];
            if (!emoteUrl) return message.reply('Please provide a valid URL');

            // Check if the emote name is valid
            if (!validEmoteName(args[1])) return message.reply('The emote name you specified is not valid! (A-Z a-z 0-9 and _)');

            if (emoteUrl.match(/^https:\/\/[w]{0,3}[.]{0,1}betterttv.com\/emotes\/[A-z0-9]{24}$/)) {
                let urlArr = [
                    `https://cdn.betterttv.net/emote/${args[0].split('/')[4]}/3x`,
                    `https://cdn.betterttv.net/emote/${args[0].split('/')[4]}/2x`,
                    `https://cdn.betterttv.net/emote/${args[0].split('/')[4]}/1x`,
                ];
                uploadEmote(urlArr, args[1]);
            } else if (emoteUrl.match(/^https:\/\/[w]{0,3}[.]{0,1}frankerfacez.com\/emoticon\/[0-9]+-[A-z0-9]+/)) {
                let urlArr = [
                    `https://cdn.frankerfacez.com/emoticon/${args[0].split('/')[4].split('-')[0]}/4`,
                    `https://cdn.frankerfacez.com/emoticon/${args[0].split('/')[4].split('-')[0]}/2`,
                    `https://cdn.frankerfacez.com/emoticon/${args[0].split('/')[4].split('-')[0]}/1`,
                ];
                uploadEmote(urlArr, args[1]);
            } else if (emoteUrl.match(/^https:\/\/[w]{0,3}[.]{0,1}7tv.app\/emotes\/[A-z0-9]{24}$/)) {
                let urlArr = [
                    `https://cdn.7tv.app/emote/${args[0].split('/')[4]}/3x`,
                    `https://cdn.7tv.app/emote/${args[0].split('/')[4]}/2x`,
                    `https://cdn.7tv.app/emote/${args[0].split('/')[4]}/1x`,
                ];
                uploadEmote(urlArr, args[1]);
            } else {
                message.guild.emojis
                    .create(args[0], args[1])
                    .then((emote) => {
                        message.channel.send(`**Success!\n**The emote ${client.emojis.cache.get(emote.id)} has been added!`);
                    })
                    .catch((err) => {
                        if (err.code === 'ETIMEDOUT') {
                            return message.channel.send(`The specified URL timed out.`);
                        } else if (err.name === 'DiscordAPIError') {
                            // check if the error INCLUDES this string, becuase the emote cap changes from guild to guild based on boosts
                            if (err.message.includes('Maximum number of emojis reached')) {
                                return message.channel.send(`This server has reached the maximum emote cap.`);
                            } else if (err.message.includes('256.0 kb')) {
                                return message.channel.send(`The file provided at the URL is too large (max 256 kb)`);
                            } else if (err.message.includes('Invalid image data')) {
                                return message.channel.send(`The specified URL does not have valid image data`);
                            } else {
                                var ownerID = client.users.cache.get(process.env.OWNERID);
                                ownerID.send(`DiscordAPI Error:\n\`${err.name} ${err.message}\`\n\nURL Provided: \`${args[0]}\` with the emote name of \`${args[1]}\` in ${message.guild.name}`);
                                return message.channel.send(`There was an error with the DiscordAPI. If this persists, please create an issue (\`$github\`)`);
                            }
                        } else {
                            var ownerID = client.users.cache.get(process.env.OWNERID);
                            ownerID.send(`Unknown Error:\n\`${err.name} ${err.message}\`\n\nURL Provided: \`${args[0]}\` with the emote name of \`${args[1]}\` in ${message.guild.name}`);
                            return message.channel.send(`There was an unknown error.`);
                        }
                    });
            }
        }

        function uploadEmote(url: string[], name: string) {
            message.guild.emojis
                .create(url[0], name)
                .then((emote) => {
                    message.channel.send(`**Success!\n**The emote ${client.emojis.cache.get(emote.id)} has been added!`);
                })
                .catch((err) => {
                    if (err.code === 'ETIMEDOUT') {
                        return message.channel.send(`The specified URL timed out.`);
                    } else if (err.name === 'DiscordAPIError') {
                        // check if the error INCLUDES this string, becuase the emote cap changes from guild to guild based on boosts
                        if (err.message.includes('Maximum number of emojis reached')) {
                            return message.channel.send(`This server has reached the maximum emote cap.`);
                        } else if (err.message.includes('256.0 kb')) {
                            message.guild.emojis
                                .create(url[1], name)
                                .then((emote) => {
                                    message.channel.send(`**Success!\n**The emote ${client.emojis.cache.get(emote.id)} has been added!`);
                                })
                                .catch((err) => {
                                    if (err.code === 'ETIMEDOUT') {
                                        return message.channel.send(`The specified URL timed out.`);
                                    } else if (err.name === 'DiscordAPIError') {
                                        // check if the error INCLUDES this string, becuase the emote cap changes from guild to guild based on boosts
                                        if (err.message.includes('Maximum number of emojis reached')) {
                                            return message.channel.send(`This server has reached the maximum emote cap.`);
                                        } else if (err.message.includes('256.0 kb')) {
                                            message.guild.emojis
                                                .create(url[2], name)
                                                .then((emote) => {
                                                    message.channel.send(`**Success!\n**The emote ${client.emojis.cache.get(emote.id)} has been added!`);
                                                })
                                                .catch((err) => {
                                                    if (err.code === 'ETIMEDOUT') {
                                                        return message.channel.send(`The specified URL timed out.`);
                                                    } else if (err.name === 'DiscordAPIError') {
                                                        // check if the error INCLUDES this string, becuase the emote cap changes from guild to guild based on boosts
                                                        if (err.message.includes('Maximum number of emojis reached')) {
                                                            return message.channel.send(`This server has reached the maximum emote cap.`);
                                                        } else if (err.message.includes('256.0 kb')) {
                                                            return message.channel.send(`The file provided at the URL is too large (max 256 kb)`);
                                                        } else if (err.message.includes('Invalid image data')) {
                                                            return message.channel.send(`The specified URL does not have valid image data`);
                                                        } else {
                                                            var ownerID = client.users.cache.get(process.env.OWNERID);
                                                            ownerID.send(
                                                                `DiscordAPI Error:\n\`${err.name} ${err.message}\`\n\nURL Provided: \`${args[0]}\` with the emote name of \`${args[1]}\` in ${message.guild.name}`
                                                            );
                                                            return message.channel.send(`There was an error with the DiscordAPI. If this persists, please create an issue (\`$github\`)`);
                                                        }
                                                    } else {
                                                        var ownerID = client.users.cache.get(process.env.OWNERID);
                                                        ownerID.send(
                                                            `Unknown Error:\n\`${err.name} ${err.message}\`\n\nURL Provided: \`${args[0]}\` with the emote name of \`${args[1]}\` in ${message.guild.name}`
                                                        );
                                                        return message.channel.send(`There was an unknown error.`);
                                                    }
                                                });
                                        } else if (err.message.includes('Invalid image data')) {
                                            return message.channel.send(`The specified URL does not have valid image data`);
                                        } else {
                                            var ownerID = client.users.cache.get(process.env.OWNERID);
                                            ownerID.send(
                                                `DiscordAPI Error:\n\`${err.name} ${err.message}\`\n\nURL Provided: \`${args[0]}\` with the emote name of \`${args[1]}\` in ${message.guild.name}`
                                            );
                                            return message.channel.send(`There was an error with the DiscordAPI. If this persists, please create an issue (\`$github\`)`);
                                        }
                                    } else {
                                        var ownerID = client.users.cache.get(process.env.OWNERID);
                                        ownerID.send(`Unknown Error:\n\`${err.name} ${err.message}\`\n\nURL Provided: \`${args[0]}\` with the emote name of \`${args[1]}\` in ${message.guild.name}`);
                                        return message.channel.send(`There was an unknown error.`);
                                    }
                                });
                        } else if (err.message.includes('Invalid image data')) {
                            return message.channel.send(`The specified URL does not have valid image data`);
                        } else {
                            var ownerID = client.users.cache.get(process.env.OWNERID);
                            ownerID.send(`DiscordAPI Error:\n\`${err.name} ${err.message}\`\n\nURL Provided: \`${args[0]}\` with the emote name of \`${args[1]}\` in ${message.guild.name}`);
                            return message.channel.send(`There was an error with the DiscordAPI. If this persists, please create an issue (\`$github\`)`);
                        }
                    } else {
                        var ownerID = client.users.cache.get(process.env.OWNERID);
                        ownerID.send(`Unknown Error:\n\`${err.name} ${err.message}\`\n\nURL Provided: \`${args[0]}\` with the emote name of \`${args[1]}\` in ${message.guild.name}`);
                        return message.channel.send(`There was an unknown error.`);
                    }
                });
        }
    },
};

/**
 * [validEmoteName check if an emote name would work as a discord emote name]
 * @param  {string} emoteName [emote name to check]
 * @return {boolean}      does the emote work as an emote name
 */
function validEmoteName(emoteName: string): boolean {
    if (!emoteName) return false;
    if (/^[a-zA-Z0-9_]*$/.test(emoteName)) {
        return true;
    } else {
        return false;
    }
}

/**
 * [validURL check if the provided argument is a valid url]
 * @param  {string} url [argument to check]
 * @return {boolean}      is the argument a valid url
 */
function validURL(url: string): boolean {
    if (url.length > 0) return false;
    if (/(http|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/.test(url)) {
        return true;
    } else {
        return false;
    }
}
