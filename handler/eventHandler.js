const fs = require('fs')

async function Eventload(client) {
    const eventFolders = fs.readdirSync('./events');
    for (const folder of eventFolders) {
        const eventFiles = fs.readdirSync(`./events/${folder}`).filter(file => file.endsWith(".js"));
        for(const file of eventFiles) {
            const event = require(`../events/${folder}/${file}`);
            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args, client))
            } else {
                client.on(event.name, (...args) => event.execute(...args, client))
            }
            console.log(`\x1b[32m[HANDLER] \x1b[33m[Events] \x1b[36m${event.name}\x1b[37m has been loaded.\x1b[0m`)
        }
    }
}

module.exports = Eventload
