const CommandLoader = require('./loader')
const MessageHandler = require('./messageHandler')

class Client{

    //add error handling
    //add options
    constructor(client, options = {}){
        if (!client) throw new Error("Missing Discord Client.") 
        if (!options) throw new Error("Missing options.") 
        if (!options.commandPath) throw new Error(`[commandPath] is missing. Specify command directory: 'commandPath': "" in options.`) 
        if (!options.mongoPath) throw new Error(`[mongoPath] is missing. If you wish to not use DB, specify: 'useNoDB: true' in options. If this is an error check to see if mongo path is correct.`) 

        this.DiscordClient = client
        this.mongoPath = options.mongoPath
        this.options = options

        client.handlerOptions = options

        new CommandLoader(client, options.commandPath, options)
        new MessageHandler(client, options)

    }
}

module.exports = Client