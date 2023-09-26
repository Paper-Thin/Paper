const { MessageEmbed } = require('discord.js');

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

if (message.content.startsWith(`${config.prefix}user`)) {
    const args = message.content.split(' ');
    if (args.length !== 2) {
      message.channel.send('Invalid command usage. Use `!user userid`');
      return;
    }

    const userId = args[1];

    try {
      const user = await client.users.fetch(userId);

      const member = message.guild.members.cache.get(userId);

      if (!user) {
        message.channel.send('User not found.');
        return;
      }

      const embed = new MessageEmbed()
        .setTitle('User Information')
        .setColor(config.embedColor)
        .setThumbnail(user.displayAvatarURL())
        .addField('User ID', user.id, true)
        .addField('Username', user.username, true)
        .addField('Tag', user.tag, true)

      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      message.channel.send('An error occurred while fetching user information.');
    }
  }
});