const CommandLoader = require('./loader')
const MessageHandler = require('./messageHandler')
const Ready = require('./ready')

/**
 * @client The heart of dchandler.
 * */
class Client{

    constructor(client, options = {}){
        if(!client) throw new Error("Missing Discord Client.") 
        if(!options) throw new Error("Missing options.") 
        if(!options.commandPath) throw new Error(`[CommandPath] is missing. Specify command directory: 'commandPath': "" in options.`) 
        if(options.mongoPath == "") throw new Error(`[MongoPath] is empty. If you wish to not use DB, Remove 'mongoPath':"" from options. If this is an error check to see if mongo URI is correct.`) 
        if(options.eventPath == "") throw new Error(`[EventPath] is empty. If you wish to not use events, Remove 'eventPath':"" from options. If this is an error check to see if path is correct. Maybe missing a directory?`) 
        if(options.showLogs === undefined || options.showLogs === null || options.showLogs === "") options.showLogs = true

        if (!options.PREFIX) {
            options.PREFIX = "$"
            if (options.showLogs) console.log(`[INFO] No PREFIX was specified, Defaulting to "$"`)
        }
        if (!options.mongoPath && options.showLogs) console.log(`[INFO] Not using mongo`)

        if (!options.customActivity) options.customActivity = { name: 'dchandler', type: 'PLAYING' }

        this.CommandLoader
        /**
         * Functions for loading files.
         * @type <class>
         * 
         */

        this.MessageHandler
        /**
         * Handles incoming commands.
         * @type <class>
         */

        this.Ready
        /**
         * Start up message and presence.
         * @type <class>
         */

        this.client = client
        /**
         * Discord client.
         * @type <DiscordClient>
         */

        this.options = options
        /**
         * dchandler config options.
         * @type <Object>
         */

        client.handlerOptions = options


        if(this.options.showLogs) console.log('Starting bot...')

        this.CommandLoader = new CommandLoader(this.client, this.options.commandPath, this.options)

        this.CommandLoader.loadCommands()
        if(this.options.eventPath) this.CommandLoader.loadEvents()
        
        this.MessageHandler = new MessageHandler(this.client, this.options)
        this.MessageHandler.listen()

        this.Ready = new Ready(this.client, this.options)   
        
    }
}

module.exports = Client