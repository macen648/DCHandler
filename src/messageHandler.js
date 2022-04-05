const guildSchema = require('./util/guildModel')
const mongo = require('../src/util/mongo')

class MessageHandler{
    constructor(client, options = {}){
        client.on('messageCreate', async message => {
            if (message.author.bot) return
            if (message.channel.type === 'dm') return

            var PREFIX 

            if (options.useNoDB == true) PREFIX = options.PREFIX
            else {
                await mongo(options.mongoPath).then(async mongoose => {
                    try {
                        const result = await guildSchema.findOne({
                            _id: message.guild.id
                        })
                        PREFIX = result ? result.PREFIX : options.PREFIX
                    } finally {
                        mongoose.connection.close()
                    }
                })

            }

            if (message.content.indexOf(PREFIX) !== 0) return

            const args = message.content.slice(PREFIX.length).trim().split(/ +/g)
            const command = args.shift().toLowerCase()

            const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command))

            if (cmd) cmd.execute(client, message, args).catch(error => {
                console.log(`Command '${command}' exited with Error`)
                console.log(error) 
            })
        })
    }
}

module.exports = MessageHandler