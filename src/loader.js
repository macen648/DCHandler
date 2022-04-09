const Discord = require('discord.js')
const path = require("path");
const fs = require("fs");


/**
 * @CommandLoader Loads files.
 */

class CommandLoader{
    constructor(client, commandPath, options = {}){
        
        this.client = client
        /**
         * Discord client
         * @type <DiscordClient>
         */

        this.options = options
        /**
         * dchandler config options
         * @type <Object>
         */

        this.commandPath = commandPath

        /**
         * Commands path.
         * @type <string>
         */

        this.eventPath = options.eventPath
        /**
         * Events path.
         * @type <string>
         */
    }   


    loadCommands(){
        //Todo add sub folders

        this.client.commands = new Discord.Collection()

        if(this.options.showLogs) console.log(`Loading commands...`)
        const commands = fs.readdirSync(`${this.commandPath}`).filter(file => file.endsWith(".js"))

        if(commands.length === 0 && this.options.showLogs) console.log(`[WARN] Command folder empty.`)

        for(const file of commands) {

            const command = require(path.join(require.main.path, this.commandPath, file))

            try {

                if(!command.name) Object.assign(command, { name: file.split('.')[0] })

                this.client.commands.set(command.name.toLowerCase(), command)

                if (this.options.showLogs) console.log(`-> Loaded command ${command.name.toLowerCase()}`)
                
                 
            } catch (error) {
                console.log(`Command file '${file.split('.')[0]}' Had a error loading. File Likely empty or is not a module.`)
                console.log(error)
            }
    
            delete require.cache[require.resolve(path.join(require.main.path, this.commandPath, file))]
        }
        if(this.options.showLogs) console.log(`All commands loaded!`)

    }

    loadEvents(){

        if(this.options.showLogs) console.log(`Loading events...`)
        const events = fs.readdirSync(this.eventPath).filter(file => file.endsWith('.js'))

        if(events.length === 0 && this.options.showLogs) console.log(`[WARN] Event folder empty.`)

        for(const file of events) {

            const event = require(path.join(require.main.path, this.eventPath, file))
     
            try {
                this.client.on(file.split('.')[0], event.bind(null, this.client))
                if (this.options.showLogs) console.log(`-> Loaded event ${file.split('.')[0]}`)
            } catch (error) {
                console.log(`Event file '${file.split('.')[0]}' Had a error loading. File Likely empty or is not a module.`)
                console.log(error)
                
            }
            
            delete require.cache[require.resolve(path.join(require.main.path, this.eventPath, file))]
        }
        if (this.options.showLogs) console.log(`All events loaded!`)
    }

}

module.exports = CommandLoader