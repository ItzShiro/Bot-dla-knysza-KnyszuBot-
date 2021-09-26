module.exports = client => {
    client.on('guildMemberAdd', member => {

        //member.guild.channels.get(botInfoChannel).send({
        //embed: {
        // color: 3447003,
        //  title: "**SERVER NAME** Welcome Bot!",
        //  url: "WEBSITE URL",
        //  description: "Welcome *" + member + "* to the **Server name** discord server!",
        //  fields: [{
        //      name: "Information",
        //      value: "Some info on the server"
        //  }],
        //  timestamp: new Date(),
        //  footer: {
        //      icon_url: client.user.avatarURL,
        //       text: "© NAME OF SERVER 2018 - 2019"
        //    }
        //  }
        // });
        console.log(member)
    })
}