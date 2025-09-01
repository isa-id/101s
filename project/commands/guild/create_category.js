const { SlashCommandBuilder, ChannelType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('create_category')
        .setDescription('Creates a new category in the server.')
        .addStringOption(option =>
            option.setName('category_name')
                .setDescription('The name of the category to create')
                .setRequired(true)),
    async execute(interaction) {
        const categoryName = interaction.options.getString('category_name');
        try {
            await interaction.guild.channels.create({
                name: categoryName,
                type: ChannelType.GuildCategory,
            });
        await interaction.reply(`Category "${categoryName}" created successfully!`);
    }
    catch (error) {
        console.error(error);
        await interaction.reply('There was an error creating the category.');
    }
},
};