class MessageHandler{
    constructor(client, options = {}){
        client.on('messageCreate', async message => {
            if (message.author.bot) return
            if (message.channel.type === 'dm') return

            var PREFIX = options.PREFIX


            if (message.content.indexOf(PREFIX) !== 0) return

            const args = message.content.slice(PREFIX.length).trim().split(/ +/g)
            const command = args.shift().toLowerCase()

            const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command))

            if (cmd) cmd.execute(client, message, args)
        })

    }
}

module.exports = MessageHandler