const CommandLoader = require('./loader')
const MessageHandler = require('./messageHandler')

class Client{
    constructor(client, options = {}){
        this.DiscordClient = client
        this.options = options

        new CommandLoader(client, options.commandPath, options)
        new MessageHandler(client, options)
    }

}

module.exports = Client