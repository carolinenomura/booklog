const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reload')
		.setDescription('Atualiza um comando.')
		.addStringOption(option =>
			option.setName('command')
				.setDescription('O comando a ser atualizado.')
				.setRequired(true)),
	async execute(interaction) {
		const commandName = interaction.options.getString('command', true).toLowerCase();
		const command = interaction.client.commands.get(commandName);

		if (!command) {
			return interaction.reply(`Nao existe comando com o nome \`${commandName}\`.`);
		}

        delete require.cache[require.resolve(`./${command.data.name}.js`)];

        try {
            interaction.client.commands.delete(command.data.name);
            const newCommand = require(`./${command.data.name}.js`);
            interaction.client.commands.set(newCommand.data.name, newCommand);
            await interaction.reply(`Comando \`${newCommand.data.name}\` Foi atualizado!`);
        } catch (error) {
            console.error(error);
            await interaction.reply(`Um erro aconteceu ao atualizar um comando \`${command.data.name}\`:\n\`${error.message}\``);
        }
	},
};