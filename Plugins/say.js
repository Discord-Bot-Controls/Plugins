  
const Discord = require("discord.js")

module.exports = async (client, message, args) => {
    if (message.channel.type === "dm") return;
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return;

    message.delete()
    message.channel.send(args.join(" "))
}

module.exports.command = {
    id: 0,
    name: "say",
    activated: true,
    info: {
        "example": "!say I'm a pepega!",
        "note": "This command will let the bot say something.",
        "requirements": "MANAGE_MESSAGES"
    }
}
