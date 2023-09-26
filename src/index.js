const Discord = require('discord.js');
const fs = require('fs');
const config = require('../config.jsonc');

const commands = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

const prefix = config.prefix;

const client = new Discord.Client({
    allowedMentions: {
      parse: [`users`, `roles`],
      repliedUser: true,

    },

    intents: [
      "GUILDS",
      "GUILD_MESSAGES",
      "GUILD_PRESENCES",
      "GUILD_PRESENCES",
      "GUILD_MESSAGE_REACTIONS",
    ],
});

client.on("ready", () => {
  console.log(`${client.user.tag} is online.`)
});


client.login(config.token);

module.exports {
  client,
  prefix,
  commands,
  Discord,
  config
};