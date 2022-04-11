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

        this.client.commands = new Discord.Collection()

        if (this.options.showLogs) console.log(`Loading commands...`)

        const localDir = fs.readdirSync(`${this.commandPath}`).filter(file => file.endsWith(".js"))
        const empty = fs.readdirSync(`${this.commandPath}`)
        var commandCount = localDir.length
        var loadedCommands = 0

        var i = 0
        fs.readdirSync(`${this.commandPath}`).forEach(dirs => {

            if(dirs == localDir[i]){
                
                const command = require(path.join(require.main.path, `${this.commandPath}`, localDir[i]))

                try {

                    if(!command.name) Object.assign(command, { name: localDir[i].split('.')[0] })

                    this.client.commands.set(command.name.toLowerCase(), command)

                    if(this.options.showLogs) console.log(`-> Loaded command ${command.name.toLowerCase()}`)
                    loadedCommands++

                } catch (error) {
                    console.log(`Command file '${localDir[i].split('.')[0]}' Had a error loading.`)
                    console.log(error)
                }

                delete require.cache[require.resolve(path.join(require.main.path, `${this.commandPath}`, localDir[i]))]
            
                i++
                return
            }
        
            const commands = fs.readdirSync(`${this.commandPath}/${dirs}`).filter(file => file.endsWith(".js"))
            commandCount += commands.length
        
            if(commands.length === 0 && this.options.showLogs) return console.log(`[WARN] Folder ${dirs} is empty.`)

            for (const file of commands) {
                const command = require(path.join(require.main.path, `${this.commandPath}/${dirs}`, file))

                try {

                    if(!command.name) Object.assign(command, { name: file.split('.')[0] })

                    this.client.commands.set(command.name.toLowerCase(), command)

                    if(this.options.showLogs) console.log(`-> Loaded command ${command.name.toLowerCase()}`)
                    loadedCommands++

                } catch (error) {
                    console.log(`Command file '${file.split('.')[0]}' Had a error loading.`)
                    console.log(error)
                }

                delete require.cache[require.resolve(path.join(require.main.path, `${this.commandPath}/${dirs}`, file))]
            }
        })

        if(empty.length === 0 && this.options.showLogs) console.log(`[WARN] Command folder empty.`)

        if (this.options.showLogs){
            if(empty.length === 0) console.log(`No commands loaded.`)
            else console.log(`${commandCount}/${loadedCommands} Commands loaded.`)
        } 
    }


    loadEvents(){
        if (this.options.showLogs) console.log(`Loading events...`)

        const localDir = fs.readdirSync(`${this.eventPath}`).filter(file => file.endsWith(".js"))
        const empty = fs.readdirSync(`${this.eventPath}`)
        var eventCount = localDir.length
        var loadedEvents = 0

        var i = 0
        fs.readdirSync(`${this.eventPath}`).forEach(dirs => {
            if (dirs == localDir[i]) {

                const event = require(path.join(require.main.path, `${this.eventPath}`, localDir[i]))

                try {

                    this.client.on(localDir[i].split('.')[0], event.bind(null, this.client))

                    if (this.options.showLogs) console.log(`-> Loaded event ${localDir[i].split('.')[0]}`)
                    loadedEvents++

                } catch (error) {
                    console.log(`Command file '${localDir[i].split('.')[0]}' Had a error loading.`)
                    console.log(error)
                }

                delete require.cache[require.resolve(path.join(require.main.path, `${this.eventPath}`, localDir[i]))]

                i++
                return
            }

            const events = fs.readdirSync(`${this.eventPath}/${dirs}`).filter(file => file.endsWith(".js"))
            eventCount += events.length

            if (events.length === 0 && this.options.showLogs) return console.log(`[WARN] Folder ${dirs} is empty.`)

            for (const file of events) {

                const event = require(path.join(require.main.path, `${this.eventPath}/${dirs}`, file))

                try {
                    this.client.on(file.split('.')[0], event.bind(null, this.client))
                    if (this.options.showLogs) console.log(`-> Loaded event ${file.split('.')[0]}`)
                    loadedEvents++
                } catch (error) {
                    console.log(`Event file '${file.split('.')[0]}' Had a error loading.`)
                    console.log(error)

                }

                delete require.cache[require.resolve(path.join(require.main.path, `${this.eventPath}/${dirs}`, file))]
            }
        })

        if (empty.length === 0 && this.options.showLogs) console.log(`[WARN] Event folder empty.`)

        if (this.options.showLogs) {
            if (empty.length === 0) console.log(`No events loaded.`)
            else console.log(`${eventCount}/${loadedEvents} Events loaded.`)
        } 
    }
}

module.exports = CommandLoader