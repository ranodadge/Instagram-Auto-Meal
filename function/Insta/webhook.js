require('dotenv').config();
const fs = require('fs');
const { WebhookClient, EmbedBuilder } = require('discord.js');
const { drawmenu } = require('./drawmenu');
const { getFlag } = require('./flagcheck');

async function startlog(){
  const webhookClient = new WebhookClient({ url: process.env.webhook });
  const today = new Date();
  if(getFlag() || today.getDay() == 0) await drawmenu(1);
  else await drawmenu(0);
  let file =[];
  for(let i = 1; i < 4; i++){
    file.push(fs.readFileSync(`photo/menu/mealImage${i}.jpg`))
  }
  try {
    webhookClient.send({
      content:
        "성공적으로 작동을 시작하였습니다. <@!890187595517157377>\n앞으로 보내질 급식 사진 상태입니다.",
      username: "동신과고 급식 시작로그",
      files: file,
    });
    console.log("성공적으로 로그를 보냈습니다.");
  } catch (error) {
    console.error("웹훅 전송 중 오류 발생" + error);
  }
}


async function successlog(buffer) {
  const webhookClient = new WebhookClient({ url: process.env.webhook });

  try {
    webhookClient.send({
      content: "🏫 | 성공적으로 게시물을 올렸습니다. <@!890187595517157377>",
      username: "동신과고 급식 전송로그",
      files: buffer,
    });
    console.log("성공적으로 로그를 보냈습니다.");
  } catch (error) {
    console.error("웹훅 전송 중 오류 발생" + error);
  }
}

async function errorlog(error) {
  const webhookClient = new WebhookClient({ url: process.env.webhook });
  const errorembed = new EmbedBuilder()
    .setTitle("에러 발생")
    .setDescription(`\`\`\`bash\n${error}\n\`\`\``)
    .setColor("Red");
  try {
    webhookClient.send({
      content: "<@!890187595517157377>",
      username: "동신과고 급식 오류로그",
      embeds: [errorembed],
    });
    console.log("성공적으로 에러로그를 보냈습니다.");
  } catch (error) {
    console.error("웹훅 전송 중 오류 발생" + error);
  }
}

async function randomlog(hour, minute) {
  const webhookClient = new WebhookClient({ url: process.env.webhook });
  try {
    webhookClient.send({
      content: `🕔 | 5시가 되어 급식 전송 시간을 다시 설정합니다. <@!890187595517157377>\n⏰ 급식 전송 스케줄 설정됨: 오후 ${hour - 12}시 ${minute}분`,
      username: "동신과고 급식 시간로그"
    });
    console.log("성공적으로 로그를 보냈습니다.");
  } catch (error) {
    console.error("웹훅 전송 중 오류 발생" + error);
  }
}

module.exports = {
  startlog,
  successlog,
  errorlog,
  randomlog
}