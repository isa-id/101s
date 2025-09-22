// create_voice_channel.js
const { SlashCommandBuilder, ChannelType, PermissionFlagsBits } = require('discord.js');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('create_voice_channel')
        .setDescription('Creates a new voice channel in the server.')
        .addStringOption(option =>
            option.setName('channel_name')
                .setDescription('The name of the voice channel to create')
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
                    type: ChannelType.GuildVoice,
                    parent: category,
                });

                return await interaction.reply(`🎤 Voice channel **"${channelName}"** created in category **"${category.name}"**!`);
            }
            else {
                await interaction.guild.channels.create({
                    name: channelName,
                    type: ChannelType.GuildVoice,
                });

                return await interaction.reply(`🎤 Voice channel **"${channelName}"** created successfully!`);
            }
        }
        catch (error) {
            console.error(error);
            await interaction.reply('❌ There was an error creating the voice channel.');
        }
    },
};

