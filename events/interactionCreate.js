const { Events } = require('discord.js');

// Commands (Interaction) listener
module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;
    
        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'Um erro aconteceu ao executar esse comando!', ephemeral: true });
            } else {
                await interaction.reply({ content: 'Um erro aconteceu ao executar esse comando!', ephemeral: true });
            }
        }
    },
};