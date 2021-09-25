# Simple Pokecord
With this package, you can `spawn`/`get` info of `random`/`fixed` pokemon.

# Installation

```sh
$ npm i pokecord
```

# Discord.js Example

```js
const { MessageEmbed } = require("discord.js");
const { Spawn } = require("pokecord");

module.exports = {
    name: "spawn", // The name of the command
    aliases: ["guess-the-pokemon"],

    run: async (client, message, args) => {
        // Getting a random pokemon
        const pokemon = await Spawn().catch(e => { });
        if (!pokemon) return message.channel.send("Opps! Something went wrong :(");

        // Sending the pokemon image
        const embed = new MessageEmbed()
            .setAuthor("Guess the pokemon")
            .setColor("#FFFF00")
            .setImage(pokemon.imageURL);

        await message.channel.send(embed);

        // Getting the user's response
        message.channel.awaitMessages({
            max: 1,
            errors: ["time"],
            time: 20000,
            filter: (msg) => msg.author.id === message.author.id,
        }).then(collected => {
            const msg = collected.first();

            if (!msg.content || msg.content.toLowerCase() !== pokemon.name.toLowerCase())
                return message.channel.send({ content: `❌ | Incorrect guess! The answer was **${pokemon.name}**.` });

            return message.channel.send({ content: `✅ | Correct guess!` });
        }).catch(() => {
            message.channel.send({ content: `❌ | You did not answer in time. The correct answer was **${pokemon.name}**!` });
        });
    }
}
```

# Join my discord
**[https://discord.gg/2SUybzb](https://discord.gg/2SUybzb)**
