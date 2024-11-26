require('dotenv').config();
const { WebhookClient } = require('discord.js');

async function sendwebhook(buffer1, buffer2, buffer3) {
    const webhookClient = new WebhookClient({ url: process.env.webhook });
  
    try {
      webhookClient.send({
        content: "🏫 | 성공적으로 게시물을 올렸습니다. <@!890187595517157377>",
        username: "동신과고 급식로그",
        files: [buffer1, buffer2, buffer3],
      });
      console.log("성공적으로 로그를 보냈습니다.");
    } catch (error) {
      console.error("웹훅 전송 중 오류 발생" + error);
    }
  }

  module.exports = {
    sendwebhook
  }