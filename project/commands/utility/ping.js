const { SlashcommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashcommandBuilder().name('ping').setDescription('Replies with Pong!'),
    async execute(interaction) {
        await interaction.reply('Pong!');
    },
};