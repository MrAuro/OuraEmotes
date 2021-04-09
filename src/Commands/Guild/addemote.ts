import { Command } from '../../Interfaces';

import * as dotenv from 'dotenv';
dotenv.config();

export const command: Command = {
    name: 'addemote',
    aliases: ['ae'],
    run: async (client, message, args) => {
        if (!message.guild.me.hasPermission('MANAGE_EMOJIS'))
            return message.channel.send(`I do not have the permission to Manage Emojis. Learn how to give me permission here: <https://mrauro.github.io/OuraEmotes/perms>`);

        // https://mrauro.github.io/OuraEmotes/perms
        
        // there is a lot of duplicate code below, this all should be moved to a function
        if (!args[0]) return message.channel.send(`Please provide a url`);
        if (!args[1]) return message.channel.send(`Please provide an emote name`);
        if (!validURL(args[0])) return message.channel.send(`The first argument you provided is not a valid URL`);
        if (!validEmoteName(args[1])) return message.channel.send(`The emote name you specified is not valid! (A-Z a-z 0-9 and _)`);
        if (args[0].includes('https://www.frankerfacez.com/emoticon/')) {
            message.guild.emojis
                .create(`https://cdn.frankerfacez.com/emoticon/${args[0].split('/')[4].split('-')[0]}/2`, args[1])
                .then((emote) => {
                    message.channel.send(`**Sucess!\n**The emote ${client.emojis.cache.get(emote.id)} has been added!`);
                })
                .catch((err) => {
                    if (err.code === 'ETIMEDOUT') {
                        return message.channel.send(`The specified URL timed out.`);
                    } else if (err.code === 'EAI_AGAIN') {
                        // i have no clue what a EAI_AGAIN error is
                        return message.channel.send(`Imma be honest with you, I really have no clue what happened, but the specified URL did not work.`);
                    } else if (err.name === 'DiscordAPIError') {
                        // check if the error INCLUDES this string, becuase the emote cap changes from guild to guild based on boosts
                        if (err.message.includes('Maximum number of emojis reached')) {
                            return message.channel.send(`This server has reached the maximum emote cap.`);
                        } else if (err.message.includes('256.0 kb')) {
                            // fallback to the lower resolution image
                            message.guild.emojis
                                .create(`https://cdn.frankerfacez.com/emoticon/${args[0].split('/')[4].split('-')[0]}/1`, args[1])
                                .then((emote) => {
                                    message.channel.send(`**Sucess!\n**The emote ${client.emojis.cache.get(emote.id)} has been added! (fellback on 2x resolution)`);
                                })
                                .catch((err) => {
                                    if (err.code === 'ETIMEDOUT') {
                                        return message.channel.send(`The specified URL timed out.`);
                                    } else if (err.code === 'EAI_AGAIN') {
                                        // i have no clue what a EAI_AGAIN error is
                                        return message.channel.send(`Imma be honest with you, I really have no clue what happened, but the specified URL did not work.`);
                                    } else if (err.name === 'DiscordAPIError') {
                                        // check if the error INCLUDES this string, becuase the emote cap changes from guild to guild based on boosts
                                        if (err.message.includes('Maximum number of emojis reached')) {
                                            return message.channel.send(`This server has reached the maximum emote cap.`);
                                        } else if (err.message.includes('256.0 kb')) {
                                            return message.channel.send(`The file provided at the URL is too large (max 256 kb)`);
                                        } else if (err.message.includes('Invalid image data')) {
                                            return message.channel.send(`The specified URL does not have valid image data`);
                                        } else {
                                            return message.channel.send(`There was an error with the DiscordAPI: ${err.message}`);
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
                            return message.channel.send(`There was an error with the DiscordAPI: ${err.message}`);
                        }
                    } else {
                        var ownerID = client.users.cache.get(process.env.OWNERID);
                        ownerID.send(`Unknown Error:\n\`${err.name} ${err.message}\`\n\nURL Provided: \`${args[0]}\` with the emote name of \`${args[1]}\` in ${message.guild.name}`);
                        return message.channel.send(`There was an unknown error.`);
                    }
                });
        } else if (args[0].includes('https://betterttv.com/emotes/')) {
            message.guild.emojis
                .create(`https://cdn.betterttv.net/emote/${args[0].split('/')[4]}/3x`, args[1])
                .then((emote) => {
                    message.channel.send(`**Sucess!\n**The emote ${client.emojis.cache.get(emote.id)} has been added!`);
                })
                .catch((err) => {
                    if (err.code === 'ETIMEDOUT') {
                        return message.channel.send(`The specified URL timed out.`);
                    } else if (err.code === 'EAI_AGAIN') {
                        // i have no clue what a EAI_AGAIN error is
                        return message.channel.send(`Imma be honest with you, I really have no clue what happened, but the specified URL did not work.`);
                    } else if (err.name === 'DiscordAPIError') {
                        // check if the error INCLUDES this string, becuase the emote cap changes from guild to guild based on boosts
                        if (err.message.includes('Maximum number of emojis reached')) {
                            return message.channel.send(`This server has reached the maximum emote cap.`);
                        } else if (err.message.includes('256.0 kb')) {
                            // fallback to the lower resolution
                            message.guild.emojis
                                .create(`https://cdn.betterttv.net/emote/${args[0].split('/')[4]}/2x`, args[1])
                                .then((emote) => {
                                    message.channel.send(`**Sucess!\n**The emote ${client.emojis.cache.get(emote.id)} has been added! (fellback on 2x resolution)`);
                                })
                                .catch((err) => {
                                    if (err.code === 'ETIMEDOUT') {
                                        return message.channel.send(`The specified URL timed out.`);
                                    } else if (err.code === 'EAI_AGAIN') {
                                        // i have no clue what a EAI_AGAIN error is
                                        return message.channel.send(`Imma be honest with you, I really have no clue what happened, but the specified URL did not work.`);
                                    } else if (err.name === 'DiscordAPIError') {
                                        // check if the error INCLUDES this string, becuase the emote cap changes from guild to guild based on boosts
                                        if (err.message.includes('Maximum number of emojis reached')) {
                                            return message.channel.send(`This server has reached the maximum emote cap.`);
                                        } else if (err.message.includes('256.0 kb')) {
                                            // fallback to the even lower resolution
                                            message.guild.emojis
                                                .create(`https://cdn.betterttv.net/emote/${args[0].split('/')[4]}/1x`, args[1])
                                                .then((emote) => {
                                                    message.channel.send(`**Sucess!\n**The emote ${client.emojis.cache.get(emote.id)} has been added! (fellback on 1x resolution)`);
                                                })
                                                .catch((err) => {
                                                    if (err.code === 'ETIMEDOUT') {
                                                        return message.channel.send(`The specified URL timed out.`);
                                                    } else if (err.code === 'EAI_AGAIN') {
                                                        // i have no clue what a EAI_AGAIN error is
                                                        return message.channel.send(`Imma be honest with you, I really have no clue what happened, but the specified URL did not work.`);
                                                    } else if (err.name === 'DiscordAPIError') {
                                                        // check if the error INCLUDES this string, becuase the emote cap changes from guild to guild based on boosts
                                                        if (err.message.includes('Maximum number of emojis reached')) {
                                                            return message.channel.send(`This server has reached the maximum emote cap.`);
                                                        } else if (err.message.includes('256.0 kb')) {
                                                            return message.channel.send(`The file provided at the URL is too large (max 256 kb)`);
                                                        } else if (err.message.includes('Invalid image data')) {
                                                            return message.channel.send(`The specified URL does not have valid image data`);
                                                        } else {
                                                            return message.channel.send(`There was an error with the DiscordAPI: ${err.message}`);
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
                                            return message.channel.send(`There was an error with the DiscordAPI: ${err.message}`);
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
                            return message.channel.send(`There was an error with the DiscordAPI: ${err.message}`);
                        }
                    } else {
                        var ownerID = client.users.cache.get(process.env.OWNERID);
                        ownerID.send(`Unknown Error:\n\`${err.name} ${err.message}\`\n\nURL Provided: \`${args[0]}\` with the emote name of \`${args[1]}\` in ${message.guild.name}`);
                        return message.channel.send(`There was an unknown error.`);
                    }
                });
        } else {
            message.guild.emojis
                .create(args[0], args[1])
                .then((emote) => {
                    message.channel.send(`**Sucess!\n**The emote ${client.emojis.cache.get(emote.id)} has been added!`);
                })
                .catch((err) => {
                    if (err.code === 'ETIMEDOUT') {
                        return message.channel.send(`The specified URL timed out.`);
                    } else if (err.code === 'EAI_AGAIN') {
                        // i have no clue what a EAI_AGAIN error is
                        return message.channel.send(`Imma be honest with you, I really have no clue what happened, but the specified URL did not work.`);
                    } else if (err.name === 'DiscordAPIError') {
                        // check if the error INCLUDES this string, becuase the emote cap changes from guild to guild based on boosts
                        if (err.message.includes('Maximum number of emojis reached')) {
                            return message.channel.send(`This server has reached the maximum emote cap.`);
                        } else if (err.message.includes('256.0 kb')) {
                            return message.channel.send(`The file provided at the URL is too large (max 256 kb)`);
                        } else if (err.message.includes('Invalid image data')) {
                            return message.channel.send(`The specified URL does not have valid image data`);
                        } else {
                            return message.channel.send(`There was an error with the DiscordAPI: ${err.message}`);
                        }
                    } else {
                        var ownerID = client.users.cache.get(process.env.OWNERID);
                        ownerID.send(`Unknown Error:\n\`${err.name} ${err.message}\`\n\nURL Provided: \`${args[0]}\` with the emote name of \`${args[1]}\` in ${message.guild.name}`);
                        return message.channel.send(`There was an unknown error.`);
                    }
                });
        }
        /*
        if (/(jpg|jpeg|gif|png)$/i.test(args[0])) {
            if (!validEmoteName(args[1])) return message.channel.send(`The emote name you specified is not valid! (Only )`);
            message.guild.emojis.create(args[0], args[1]).then((emote) => {
                message.channel.send(`**Sucess!\n**The emote ${client.emojis.cache.get(emote.id)} has been added!`);
            });
        } else {
            message.guild.emojis.create(args[0], args[1]).then((emote) => {
                message.channel.send(`**Sucess!\n**The emote ${client.emojis.cache.get(emote.id)} has been added!`);
            });
        }
        */
    },
};

/**
 * [validEmoteName check if an emote name would work as a discord emote name]
 * @param  {string} emoteName [emote name to check]
 * @return {boolean}      does the emote work as an emote name
 */
function validEmoteName(emoteName: string) {
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
function validURL(url: string) {
    if (/(http|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/.test(url)) {
        return true;
    } else {
        return false;
    }
}
