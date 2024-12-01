require('dotenv').config();
const { Routes, Client, REST } = require('discord.js')
const fs = require('fs')

/**
 * 
 * @param {Client} client 
 */

async function SlashCommandload(client) {
    const commands = [];

    const commandsFolders = "./slashcommands";
    const commandsFolder = fs.readdirSync(commandsFolders)
    for(const folder of commandsFolder){
        const commandsFiles = fs.readdirSync(`./slashcommands/${folder}`).filter(file => file.endsWith(".js"))
        for (const file of commandsFiles) {
            const command = require(`../slashcommands/${folder}/${file}`)
            client.slashcommands.set(command.data.name, command)
            commands.push(command.data.toJSON())
            console.log(`\x1b[32m[HANDLER] \x1b[33m[SlashCommands] \x1b[36m${command.data.name}\x1b[37m has been loaded.\x1b[0m`)
        }
    }
        

    const rest = new REST({ version: "10" }).setToken(process.env.TOKEN)

    rest.put(Routes.applicationCommands(process.env.clientid), {
        body: commands
    }).then((command) => {
        console.log(`${command.length}개의 명령어를 푸쉬하였습니다.`)
    }).catch((err) => {
        console.log(err)
    })
}

module.exports = SlashCommandload