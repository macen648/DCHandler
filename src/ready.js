class Ready{
    constructor(client, options){
     
        client.on('ready', client => {
            
            if (!options.noShowActivity) client.user.setActivity(options.customActivity.name, { type: `${options.customActivity.type}` })
            else client.user.setPresence({ activity: null })

            if (!options.showLogs) return

            console.log(`Client ${client.user.username} is online!`)
            console.log(`Client ${client.user.username} now listening for commands with local prefix ${options.PREFIX}`)
        
        })   
    }
}

module.exports = Ready