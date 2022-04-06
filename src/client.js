const CommandLoader = require('./loader')
const MessageHandler = require('./messageHandler')
const Ready = require('./ready')

class Client{

    constructor(client, options = {}){
        if (!client) throw new Error("Missing Discord Client.") 
        if (!options) throw new Error("Missing options.") 
        if (!options.commandPath) throw new Error(`[commandPath] is missing. Specify command directory: 'commandPath': "" in options.`) 
        if (!options.mongoPath && !options.useNoDB) throw new Error(`[mongoPath] is missing. If you wish to not use DB, specify: 'useNoDB: true' in options. If this is an error check to see if mongo path is correct.`) 

        this.options = options

        this.DiscordClient = client
   
        client.handlerOptions = options

        if(options.showLogs) console.log('Starting bot...')

        new CommandLoader(client, options.commandPath, options)
        new MessageHandler(client, options)
        new Ready(client, options)

    }
}

module.exports = Client