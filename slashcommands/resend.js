require('dotenv').config();
const { SlashCommandBuilder, ChatInputCommandInteraction } = require('discord.js');
const { publish } = require('../function/Insta/publish');
const { setFlag } = require('../function/Insta/flagcheck');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("재전송")
        .setDescription("명령어를 통해 재전송합니다")
        .addStringOption(st => st
            .setName("언제")
            .setDescription("언제 보낼지 정합니다.")
            .addChoices(
                { "name": "오늘", value: "0" },
                { "name": "내일", value: "1" }
            )
            .setRequired(true)
        )
        ,
    /**
     * @param { ChatInputCommandInteraction } interaction
     */
    async execute(client, interaction){
        const t = interaction.options.getString("언제");
        let when = Number(t);

        publish(when);

        interaction.reply("재전송을 시작하였습니다.");
    }
}
