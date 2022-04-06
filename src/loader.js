const Discord = require('discord.js')
const path = require("path");
const fs = require("fs");

class CommandLoader{
    constructor(client, commandPath, options = {}){
        
        client.commands = new Discord.Collection()

        this.options = options
        this.commandPath = commandPath


        //Todo add sub folders
        if(options.showLogs) console.log(`Loading commands...`)
        const commands = fs.readdirSync(`${commandPath}`).filter(file => file.endsWith(".js"))

         for (const file of commands) {
            const command = require(path.join(require.main.path, commandPath, file))
            if(options.showLogs) console.log(`Loaded command ${command.name.toLowerCase()}`)
            client.commands.set(command.name.toLowerCase(), command)
            delete require.cache[require.resolve(path.join(require.main.path, commandPath, file))]
        }
        if(options.showLogs) console.log(`All commands loaded!`)
        
    }   
}

module.exports = CommandLoader