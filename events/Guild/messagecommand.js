require('dotenv').config();
const { Client, Message, EmbedBuilder, Events } = require('discord.js')

module.exports = {
    name: Events.MessageCreate,
    /**
     * 
     * @param {Message} message 
     * @param {Client} client 
     */
    async execute(message, client) {
        if (!message.content.startsWith(process.env.prefix) || message.author.bot) return;

        const args = message.content.slice(process.env.prefix).trim().split(/ +/g);
        const commandName = args.shift();
        const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) return;

        if (command.permissions) {
            const authorPermissions = message.channel.permissionsFor(message.author);
            if (!authorPermissions || !authorPermissions.has(command.permissions)) {
                const blockingembed = new EmbedBuilder()
                .setTitle("⚠️ㅣ오류")
                .setDescription("이 명령어를 사용하기 위한 권한이 없습니다.\n(해당 메시지는 2초후 제거됩니다.)")
                .setColor(0xff4242)
                .setTimestamp()

                return message.reply({ embeds: [blockingembed] }).then((sent) => {
                    setTimeout(() => {
                        sent.delete()
                    }, 2000)
                })
            }
        }

        try {
            command.execute(client, message, args);
        } catch (err) {
            console.log(err)
            const errorEmbed = new EmbedBuilder()
                .setTitle("⚠️ㅣ오류")
                .setDescription(`아래에서 오류를 확인해주세요\n\n${err}`)
                .setTimestamp()
                .setColor(0xff4242)

            return message.channel.send({ embeds: [errorEmbed] })
        }
    }
}

