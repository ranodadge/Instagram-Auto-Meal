require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const cron = require('node-cron');
const { getFlag, setFlag } = require('./function/Insta/flagcheck');
const { publish } = require('./function/Insta/publish');
const { startlog, randomlog, errorlog } = require('./function/Insta/webhook');

let cronJob = cron.ScheduledTask || null;

function scheduleRandomJob() {
    if (cronJob) {
        cronJob.stop();
    }

    const minute = Math.floor(Math.random() * 60);
    const cronExpression = `${minute} 21 * * 0-4`;

    cronJob = cron.schedule(cronExpression, () => {
        if(getFlag()) return errorlog("이미 오늘 급식을 보냈습니다.");
        publish(1);
    });
    randomlog(cronExpression);
}

cron.schedule('0 5 * * 0-4', () => {
    scheduleRandomJob();
});

scheduleRandomJob();