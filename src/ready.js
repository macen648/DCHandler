/**
 * @Ready Start up.
 */
class Ready{
    constructor(client, options){
     
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


        client.on('ready', client => {
            
            if (!this.options.noShowActivity) client.user.setActivity(this.options.customActivity.name, { type: `${this.options.customActivity.type}` })
            else client.user.setPresence({ activity: null })

            if (!this.options.showLogs) return

            console.log(`Client ${client.user.username} is online!`)
            console.log(`Client ${client.user.username} now listening for commands with local prefix ${this.options.PREFIX}`)
        })   
    }
}

module.exports = Ready