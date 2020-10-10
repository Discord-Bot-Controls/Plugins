const Discord = require("discord.js") //! We now use Discord.js v12
const ms = require("ms")

module.exports = async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_CHANNELS"))
        return message.reply("You don't have permission! ❌")
    if (!args)
        return message.channel.send(new Discord.MessageEmbed().setTitle("Wrong Usage!").setDescription("!giveaway #channel time item").setColor("RED"));
    //if (!ms(args[1]))
    //    return message.channel.send(new Discord.MessageEmbed().setTitle("Wrong Usage!").setDescription("!giveaway #channel time item").setColor("RED"));
    var time_ms = ms(args[0])
    message.mentions.channels.first().send(new Discord.MessageEmbed()
        .setTitle("Giveaway")
        .setColor("BLUE")
        .setTimestamp(Date.now() + ms(args[0]))
        .setDescription(
            `${a = args, delete a[0], a.join(" ").split(" ").join(" ")}\n\n` +
            `Hosted by: ${message.author}`
        )
    ).then(giveaway => {
        giveaway.react("🎉")
        message.react("👍")

        setTimeout(() => {
            var a = giveaway.reactions.cache.first().users.cache
            a.delete(a.findKey(u => u.id === client.user.id))
            var winner = a.random(1)[0]
            
            giveaway.edit(new Discord.MessageEmbed()
                .setTitle("Giveaway")
                .setColor("GREEN")
                .setTimestamp()
                .setDescription(
                    `${a = args, delete a[0], a.join(" ").split(" ").join(" ")}\n\n` +
                    `Winner: <@!${winner.id}>`
                )
            ).then(() => {
                giveaway.channel.send(`<@!${winner.id}> has won ${a = args, delete a[0], a.join(" ").split(" ").join(" ").slice(1)}!\n\nhttps://discordapp.com/channels/${giveaway.guild.id}/${giveaway.channel.id}/${giveaway.id}`)
            })
        }, time_ms)
    })
}

module.exports.command = {
    id: 0,
    name: "giveaway",
    activated: true,
    info: {
        "example": "!giveaway #channel time item",
        "note": "Create a nice giveaway now!",
        "requirements": "None"
    }
}
