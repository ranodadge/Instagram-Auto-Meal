const fs = require('fs');

async function Commandload(client) {
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith(".js"));
    for (const file of commandFiles) {
            const command = require(`../commands/${file}`);
            client.commands.set(command.name, command)
            console.log(`\x1b[32m[HANDLER] \x1b[33m[Commands] \x1b[36m${command.name}\x1b[37m has been loaded.\x1b[0m`)
        }
}

module.exports = Commandload