require('dotenv').config();
const { Client, Collection } = require('discord.js');
const client = new Client({ intents: [137071] });
const Eventload = require('./handler/eventHandler');
const Commandload = require('./handler/messagecommandHandler');
const SlashCommandload = require('./handler/slashcommandHandler');
const cron = require('node-cron');
const { scheduleRandomJob, firstschedule } = require('./function/Insta/schedule');

client.commands = new Collection();
client.slashcommands = new Collection();

let timesetcron = cron.ScheduledTask || null;

timesetcron = cron.schedule('0 5 * * 0-4', () => {
    scheduleRandomJob();
});

firstschedule();

module.exports = {
    timesetcron,
    client
}

Eventload(client);
Commandload(client);
SlashCommandload(client);

client.login(process.env.TOKEN);
