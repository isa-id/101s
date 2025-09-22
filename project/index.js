// Require the necessary discord.js classes
const { Client, Collection, Events, GatewayIntentBits, MessageFlags } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.cooldowns = new Collection();

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.

// Load commands
client.commands = new Collection();
// Construct the path to the commands folder
// __dirname is the directory of the current module (i.e., this file)
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);
// Loop through each folder in the commands directory
// For each folder, construct the path to the folder and read all .js files in it
for (const folder of commandFolders) {
    // Construct the path to the folder and Read all .js files in the folder
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
        // Construct the full path to the command file
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
            // Add the command to the client's commands collection
			client.commands.set(command.data.name, command);
		}
        else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}
// Construct the path to the events folder
const eventsPath = path.join(__dirname, 'events');
// Read all .js files in the events folder
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
// Loop through each event file
// For each file, construct the path to the file and require it
// Then, depending on whether the event should be handled once or multiple times, attach the appropriate listener to the client

for (const file of eventFiles) {
	// Construct the full path to the event file
	const filePath = path.join(eventsPath, file);
	// Require the event file
	const event = require(filePath);
	// Check if the event should be handled once or multiple times
	if (event.once) {
		// Attach a one-time listener for the event
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		// Attach a listener for the event
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// Log in to Discord with your client's token
client.login(token);