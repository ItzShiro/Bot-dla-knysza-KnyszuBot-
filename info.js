module.exports = {
    name: 'info',
    description: "That command info.",
    execute(message, args) {
        const Discord = require('discord.js');
        let user = message.mentions.users.first() || message.author;

        if (!user)
            return message.reply("Who that user? I dunno him.") // if there is no user mentioned, or provided, it will say this

        let memberembed = new Discord.MessageEmbed()
            .setDescription("__**Member Information**__")
            .setColor(0x15f153)
            .setThumbnail(user.avatarUrl) // Their icon
            .addField("Nick", `${user.username}#${user.discriminator}`) // Their name, I use a different way, this should work
            .addField("ID", user.id) // Their ID
            .addField("Dołączył", user.createdAt) // When they joined

        message.channel.send(memberembed)
    }
}