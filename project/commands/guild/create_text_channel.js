// create_text_channel.js
const { SlashCommandBuilder, ChannelType, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('create_channel')
        .setDescription('Creates a new text channel in the server.')
        .addStringOption(option =>
            option.setName('channel_name')
                .setDescription('The name of the channel to create')
                .setRequired(true))
        .addChannelOption(option =>
            option.setName('category')
                .setDescription('The category to create the channel in')
                .addChannelTypes(ChannelType.GuildCategory)
                .setRequired(false)),
    async execute(interaction) {
        const channelName = interaction.options.getString('channel_name');
        const category = interaction.options.getChannel('category');

        if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ManageChannels)) {
            return interaction.reply('❌ I need the **Manage Channels** permission to do that.');
        }

        try {
            if (category) {
                await interaction.guild.channels.create({
                    name: channelName,
                    type: ChannelType.GuildText,
                    parent: category,
                });

                return await interaction.reply(`✅ Channel **"${channelName}"** created in category **"${category.name}"**!`);
            }
            else {
                await interaction.guild.channels.create({
                    name: channelName,
                    type: ChannelType.GuildText,
                });

                return await interaction.reply(`✅ Channel **"${channelName}"** created successfully!`);
            }
        }
        catch (error) {
            console.error(error);
            await interaction.reply('❌ There was an error creating the channel.');
        }
    },
};
