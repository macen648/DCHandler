const guildSchema = require('./util/guildModel')
const mongo = require('../src/util/mongo')

/**
 * @MessageHandler Deals with incoming commands.
 */
class MessageHandler{
    constructor(client, options = {}){

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

        this.PREFIX
        /**
         * Command prefix.
         * @type <string>
         */
    }

    listen(){
        this.client.on('messageCreate', async message => {
            if (message.author.bot) return
            if (message.channel.type === 'dm') return


            if (this.options.useNoDB == true) this.PREFIX = this.options.PREFIX
            else {
                await mongo(this.options.mongoPath).then(async mongoose => {
                    try {
                        const result = await guildSchema.findOne({
                            _id: message.guild.id
                        })
                        this.PREFIX = result ? result.PREFIX : this.options.PREFIX
                    } finally {
                        mongoose.connection.close()
                    }
                })

            }

            if (message.content.indexOf(this.PREFIX) !== 0) return

            const args = message.content.slice(this.PREFIX.length).trim().split(/ +/g)
            const command = args.shift().toLowerCase()

            const cmd = this.client.commands.get(command) || this.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command))

            if (cmd) cmd.execute(this.client, message, args).catch(error => {
                console.log(`Command '${command}' exited with Error`)
                console.log(error)
            })
        })
    }

}

module.exports = MessageHandler