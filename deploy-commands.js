const { REST, Routes } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();
const { DISCORD_TOKEN, CLIENT_ID, GUILD_ID} = process.env;
const fs = require('node:fs');
const path = require('node:path');

const commands = [];

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			commands.push(command.data.toJSON());
		} else {
			console.log(`[ATENCAO] O comando em ${filePath} está sem uma propriedade "data" ou "execute" necessaria.`);
		}
	}
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(DISCORD_TOKEN);

// Deployment
(async () => {
	try {
		console.log(`Iniciando atualizacao de ${commands.length} comandos (/) da aplicacao.`);

		// Refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
			{ body: commands },
		);

		console.log(`${data.length} comandos da aplicacao recarregados com sucesso.`);
	} catch (error) {
		console.error(error);
	}
})();