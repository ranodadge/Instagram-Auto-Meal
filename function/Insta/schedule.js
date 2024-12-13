const cron = require('node-cron')
const { getFlag } = require('./flagcheck');
const { publish } = require('./publish')
const { randomlog, startlog, errorlog } = require('./webhook');

let cronJob = cron.ScheduledTask || null;

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
    randomlog(hour, minute);
}

function firstschedule() {
    if (cronJob) {
        cronJob.stop();
    }

    const minute = Math.floor(Math.random() * 60);
    const hour = Math.floor(Math.random() * 1) + 20;
    const cronExpression = `${minute} ${hour} * * 0-4`;

    startlog(hour, minute);

    cronJob = cron.schedule(cronExpression, () => {
        if(getFlag()) return errorlog("이미 오늘 급식을 보냈습니다.");
        publish(1);
    });
}

module.exports = {
    scheduleRandomJob,
    firstschedule
}