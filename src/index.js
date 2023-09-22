const Discord = require("discord.js");
const packageJSON = require("../package.json");
const config = require("../config.json")
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
  ] 
});

client.on('ready', () => {
  console.log(`Bot up and running.`);
});

client.on('message', async (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith('!ban')) {
    const args = message.content.split(' ');
    if (args.length < 3) {
      message.channel.send('Invalid command usage. Use `!ban userid reason`');
      return;
    }

    const userToBan = args[1];

    // Reason
    const reason = args.slice(2).join(' ');

    // Ban
    const member = message.guild.members.cache.get(userToBan);
    if (!member) {
      message.channel.send('User not found.');
      return;
    }

    member
      .ban({ reason: reason })
      .then(() => {
        message.channel.send(`Banned ${member.user.tag} for: ${reason}`);
      })
      .catch((error) => {
        console.error(error);
        message.channel.send('An error occurred while banning the user.');
      });
  } else if (message.content.startsWith('!mute')) {
    const args = message.content.split(' ');
    if (args.length < 4) {
      message.channel.send('Invalid command usage. Use `!mute userid amountoftime reason`');
      return;
    }

    // Get id
    const userId = args[1];

    // Duration
    const muteDuration = parseTime(args[2]);
    if (muteDuration === null) {
      message.channel.send('Invalid time format. Use `s` for seconds, `m` for minutes, or `h` for hours.');
      return;
    }

    // Reason
    const reason = args.slice(3).join(' ');

    // Mute
    const member = message.guild.members.cache.get(userId);
    if (!member) {
      message.channel.send('User not found.');
      return;
    }

    // Muted role ID
    const mutedRole = message.guild.roles.cache.find((role) => role.id === config.mute_role_id);
    if (!mutedRole) {
      message.channel.send('The "Muted" role does not exist. Please create it.');
      return;
    }

    try {
      // Mute the user
      await member.roles.add(mutedRole);
      message.channel.send(`Muted ${member.user.tag} for ${muteDuration} with reason: ${reason}`);

      // Unmute after the specified duration
      setTimeout(async () => {
        await member.roles.remove(mutedRole);
        message.channel.send(`Unmuted ${member.user.tag} after ${muteDuration}`);
      }, muteDuration * 1000);
    } catch (error) {
      console.error(error);
      message.channel.send('An error occurred while muting the user.');
    }
  } else if (message.content.startsWith('!kick')) {
    const args = message.content.split(' ');
    if (args.length < 3) {
      message.channel.send('Invalid command usage. Use `!kick userid reason`');
      return;
    }

    // Get the userID
    const userId = args[1];

    // Reason
    const reason = args.slice(2).join(' ');

    // Execute the kick
    const member = message.guild.members.cache.get(userId);
    if (!member) {
      message.channel.send('User not found.');
      return;
    }

    try {
      // Kick
      await member.kick(reason);
      message.channel.send(`Kicked ${member.user.tag} for: ${reason}`);
    } catch (error) {
      console.error(error);
      message.channel.send('An error occurred while kicking the user.');
    }
  }
});

client.login(token);

// Function to get time in the format "10s", "10m", or "24h"
function parseTime(input) {
  const regex = /^(\d+)([smh])$/;
  const matches = input.match(regex);

  if (!matches) return null;

  const value = parseInt(matches[1]);
  const unit = matches[2];

  if (unit === 's' && value <= 60) {
    return value;
  } else if (unit === 'm' && value <= 525600) {
    return value * 60;
  } else if (unit === 'h' && value <= 8760) {
    return value * 3600;
  } else if (unit === 'd' && value <= 365) {
    return value;
  } else
    return null;
  }
}