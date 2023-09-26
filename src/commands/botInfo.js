const { MessageEmbed } = require('discord.js');

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

if (message.content.startsWith(`${config.prefix}bot`)) {
    const args = message.content.split(' ');
    return;
    }

      const embed = new MessageEmbed()
        .setTitle('User Information')
        .setColor(config.embedColor)
        .setThumbnail(client.displayAvatarURL())
        .addField('Bot ID', user.id, true)
        .addField('Bot Username', user.username, true)
        .addField('Bot Tag', user.tag, true)
        .addField('Programmed by Ephraim Kreighbaum and ShadowDude', true)

      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      message.channel.send('An error occurred while fetching bot information.');
    }
  }
});