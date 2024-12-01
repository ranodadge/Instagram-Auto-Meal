const { Events, Client, ChatInputCommandInteraction, ChannelType } = require('discord.js')

module.exports = {
    name: Events.InteractionCreate,
    /**
     * @param {Client} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction, client) {
        if (!interaction.isChatInputCommand()) return;
        if (interaction.channel.type == ChannelType.DM) return;
        const command = client.slashcommands.get(interaction.commandName);
        if (!command) return;
        try {
            await command.execute(client, interaction);
        } catch (err) {
            console.log(err)
            interaction.editReply(`오류: \n${err}`);
        }
    }
}
