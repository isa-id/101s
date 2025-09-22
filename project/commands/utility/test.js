// test.js
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('A command for testing purposes.'),
    async execute(interaction) {
        await interaction.reply('This is a test command!');
    },
};