require('dotenv').config();
const { Client, Collection } = require('discord.js');
const client = new Client({ intents: [137071] });
const Eventload = require('./handler/eventHandler');
const Commandload = require('./handler/messagecommandHandler');
const SlashCommandload = require('./handler/slashcommandHandler');
const cron = require('node-cron');
const { getFlag, setFlag } = require('./function/Insta/flagcheck');
const { publish } = require('./function/Insta/publish');
const { randomlog, errorlog } = require('./function/Insta/webhook');

client.commands = new Collection();
client.slashcommands = new Collection();


let cronJob = cron.ScheduledTask || null;
let timesetcron = cron.ScheduledTask || null;

function scheduleRandomJob() {
    if (cronJob) {
        cronJob.stop();
    }

    const minute = Math.floor(Math.random() * 60);
    const hour = Math.floor(Math.random() * 1) + 20;
    const cronExpression = `${minute} ${hour} * * 0-4`;

    cronJob = cron.schedule(cronExpression, () => {
        if(getFlag()) return errorlog("이미 오늘 급식을 보냈습니다.");
        publish(1);
    });
}

timesetcron = cron.schedule('0 5 * * 0-4', () => {
    randomlog(hour, minute);
    scheduleRandomJob();
});

scheduleRandomJob();

module.exports = {
    cronJob,
    timesetcron,
    scheduleRandomJob,
    client
}

Eventload(client);
Commandload(client);
SlashCommandload(client);

client.login(process.env.TOKEN);