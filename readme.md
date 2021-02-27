<h1 align="center">OuraEmotes</h1>

<h3 align="center">A Discord.JS bot that lets you add BTTV/FFZ Emotes directly to your server</h3>

<p align="center">
  <a href="#about">About</a>
  •
  <a href="#commands">Commands</a>
  •
  <a href="#setup">Setup</a>
</p>

## About
**If you want this bot in your server, you can invite it [here](https://discord.com/oauth2/authorize?client_id=761088567010394142&scope=bot&permissions=1073741824)**

If you find a bug, report it at the [issues tab](https://github.com/MrAuro/OuraEmotes/issues) and if you want to contribute to the bot, create a [pull request!](https://github.com/MrAuro/OuraEmotes/pulls)

---
## Commands
<details>
<summary>Commands</summary>

#### ping
`!ping`

Aliases: `ping` / `p`

Ping the bot

#### addemote
`!addemote <BTTV/FFZ/Image Link> <Emote Name>`

Aliases: `addemote` / `ae`

Add an emote to the Discord Server

#### invite
`!invite`

Aliases: `invite` / `i`

Sends the invite link for the bot

</details>

---
## Setup
If you want to install this bot to run locally you will need [Node](https://nodejs.org/en/), [Git](https://git-scm.com/), and a bot token from the [Discord Developer Portal](https://discord.com/developers/applications)

After installing Node and Git, clone this repository:
```
git clone https://github.com/MrAuro/OuraEmotes.git
```

Once you have cloned the repo, `cd` into where you cloned it and install the npm packages:
```
npm install
```
or alternatively using [yarn](https://www.npmjs.com/package/yarn)
```
yarn
```
Create a `.env` file to store your token and Discord ID formatted like:
```
TOKEN=<DISCORD TOKEN>
OWNERID=<OWNER ID>
```

Start the bot by using
```
node start 
```
or alternatively using [yarn](https://www.npmjs.com/package/yarn)
```
yarn start
```

The bot should be running, and you can invite it to your own Discord server by putting your Client ID [here](https://discordapi.com/permissions.html#1073741824)


If you find any issues, [create an issue](https://github.com/MrAuro/OuraEmotes/issues)

---

## License
This project is licensed under [GNU 3.0](https://www.gnu.org/licenses/gpl-3.0.en.html)