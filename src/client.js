const CommandLoader = require('./loader')
const MessageHandler = require('./messageHandler')
const Ready = require('./ready')

class Client{

    constructor(client, options = {}){
        if(!client) throw new Error("Missing Discord Client.") 
        if(!options) throw new Error("Missing options.") 
        if(!options.commandPath) throw new Error(`[commandPath] is missing. Specify command directory: 'commandPath': "" in options.`) 
        if(!options.mongoPath && !options.useNoDB) throw new Error(`[mongoPath] is missing. If you wish to not use DB, specify: 'useNoDB: true' in options. If this is an error check to see if mongo path is correct.`) 

        if(!options.PREFIX){
            options.PREFIX = "$"
            console.log(`[WARN] No PREFIX was specified, Defaulting to "$"`)
        } 
        if(options.showLogs === undefined || options.showLogs === null || options.showLogs === "") options.showLogs = true
        if(!options.customActivity) options.customActivity = { name: 'dchandler', type: 'COMPETING' }

        this.options = options

        this.DiscordClient = client
   
        client.handlerOptions = options

        if(options.showLogs) console.log('Starting bot...')

        new CommandLoader(client, this.options.commandPath, this.options)
        new MessageHandler(client, this.options)
        new Ready(client, this.options)
    }
}

module.exports = Client