# DCHandler
[![NPM Badge](https://nodei.co/npm/dchandler.png?downloads=true&stars=true)](https://nodei.co/npm/dchandler)
A discord bot command handler made simple.

## Installation
Requires Discord.js v13

Install the package with this command:
```
npm i dchandler
```

## Example Usage
Basic setup
```js
const {Client, Intents} = require('discord.js')
const Handler = require('dchandler')

const client = new Client({
    intents: [], // Your bots required Intents.
})

const handler = new Handler.HandlerClient(client, {// Pass in discord.js client and options.
    commandPath: "commands", // commands folder
    PREFIX: "$" // bot prefix
})

client.login('token')// Your bots token.
```
Basic command
```js
module.exports = {
/**
    Information about the command.
    Name
    aliases
    ect...
*/
    name: 'ping', // Name and aliases are used by the command handler to call the command.
    aliases: [],
    execute(client, message) {
        message.react("🏓")
        return message.channel.send(`Last ping ${ms(Date.now() - client.ws.shards.first().lastPingTimestamp, { long: true })} ago: **${client.ws.ping}ms** 🛰️)
    },
}
```
## Me
Discord: macen#0001
Github: https://github.com/macen648
Npm: https://www.npmjs.com/~macen

## License

MIT

**Free Software, Hell Yeah!**

