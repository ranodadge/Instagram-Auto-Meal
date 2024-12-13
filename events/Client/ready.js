const { Client, Events, ActivityType } = require('discord.js');
const { startlog } = require('../../function/Insta/webhook');

module.exports = {
    name: Events.ClientReady,
    /**
     * @param {Client} client 
     */
    async execute(client) {
        console.log(`${client.user.username}(으)로 로그인되었습니다.`);
        client.user.setActivity({ name: "인스타 확인", type: ActivityType.Playing });
    }
}
