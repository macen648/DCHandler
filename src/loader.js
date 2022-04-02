const Discord = require('discord.js')
const path = require("path");
const fs = require("fs");

class CommandLoader{
    constructor(client, commandPath, options = {}){
        
        client.commands = new Discord.Collection()

        this.options = options
        this.commandPath = commandPath


        //Todo add sub folders

        const commands = fs.readdirSync(`${commandPath}`).filter(file => file.endsWith(".js"));

         for (const file of commands) {
            const command = require(path.join(require.main.path, commandPath, file));
            client.commands.set(command.name.toLowerCase(), command)
            delete require.cache[require.resolve(path.join(require.main.path, commandPath, file))]
        }
    }   

}

module.exports = CommandLoader