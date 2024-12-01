require('dotenv').config();
const { Message } = require('discord.js');
const { publish } = require('../function/Insta/publish');
const { setFlag } = require('../function/Insta/flagcheck');

module.exports = {
    name: "재전송",
    aliases: ["resend", "ㅈㅈㅅ"],
    description: "전송되지 않았을 때 명령어를 통해 재전송합니다.",
    form: "재전송 [오늘/내일]",
    /**
     * @param { Message } message
     */
    async execute(client, message, args){
        if(!args[0]) return message.reply(`명령어 형식을 지켜주세요!\n형식: \"\`${process.env.prefix}재전송 [오늘/내일]\`\"`);
        
        const when = args[0];
        let t;
        if(args[0] === "오늘") t = 0;
        else if(args[0] === "내일") t = 1;
        else return message.reply(`명령어 형식을 지켜주세요!\n형식: \"\`${process.env.prefix}재전송 [오늘/내일]\`\"`);

        publish(t);

        message.reply("재전송을 시작하였습니다.");
    }
}