const { Client, Intents, MessageActionRow, MessageSelectMenu, MessageButton, MessageEmbed } = require('discord.js');
const config = require('../../config.json');

client.once('ready', () => {
    console.log('Tickets Ready!');
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'setup') {
        if (!interaction.member.permissions.has('ADMINISTRATOR')) return interaction.reply('You do not have permission to use this command.');

        const roles = interaction.guild.roles.cache.filter(role => !role.managed && role.name !== '@everyone').map(role => {
            return {
                label: role.name,
                value: role.id,
            };
        });

        const roleMenu = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('role')
                    .setPlaceholder('Select a role')
                    .addOptions(roles),
            );

        const setupEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Ticket System Setup')
            .setDescription('Please select a role to ping when a ticket is created.');

        await interaction.reply({ embeds: [setupEmbed], components: [roleMenu] });
    }
});
        const selectedRole = interaction.values[0];

        const finishButton = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('finish')
                    .setLabel('Finish')
                    .setStyle('PRIMARY'),
            );

        const setupEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Ticket System Setup')
            .setDescription(`Selected role: ${selectedRole}`);

        await interaction.update({ embeds: [setupEmbed], components: [finishButton] });
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    if (interaction.customId === 'finish') {
        // Handle finish button click
        const ticketMenu = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('ticket')
                    .setPlaceholder('Select a ticket type')

                    .addOptions([
                        {
                            label: 'Billing',
                            value: 'billing',
                        },
                        {
                            label: 'Technical',
                            value: 'technical',
                        },
                        {
                            label: 'Other',
                            value: 'other',
                        },
                    ]),
            );

        const ticketEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Ticket Menu')
            .setDescription('Please select a ticket type.');

        await interaction.update({ embeds: [ticketEmbed], components: [ticketMenu] });
    }
});
