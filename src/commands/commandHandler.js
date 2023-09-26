const Discord = require("discord.js");

client.on('messageCreate', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
  
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
  });

  module.exports = {
    command,
    args
  };