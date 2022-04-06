class ready{
    constructor(client, options){
     
        client.on('ready', client => {
            if(options.showLogs){
                console.log(`Client ${client.user.username} is online!`)
                console.log(`Client ${client.user.username} now listening for commands with local prefix ${client.config.app.DEFAULT_PREFIX}`)
            }
            if(!options.noShowActivity){
                if(customActivity) client.user.setActivity(`${customActivity.name}`, { type: `${customActivity.type}` })
                else client.user.setActivity(`Using dchandler.`, { type: 'WATCHING' })
            }

        })
        
    }

}