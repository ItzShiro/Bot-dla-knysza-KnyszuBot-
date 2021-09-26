const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
const info = require('./commands/info');

const main = require('./json/main.json')

global.info = {
    "status": "Im Alive :D",
    "statusIndicator": "online",
    "membersJoined": 0
}

var botInfoChannel = "804607596895272960";


client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.login(main.token);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('guildMemberAdd', member => {
    member.guild.channels.cache.get(botInfoChannel).send(`${main.prefix}info ${member}`)
    info.membersJoined += 1
    console.log(`${member.nickname} Joined`);
})
client.on('guildMemberRemove', member => {
    info.membersJoined -= 1
})

client.on('message', message => {
    const d = new Date(message.createdTimestamp);
    messageTimestamp = d.getHours() + ":" + d.getMinutes();

    console.log(`[${messageTimestamp}](#${message.channel.name})${message.author.tag}: ${message}`)

    const [...args] = message.content.slice(main.prefix.length).split(/ +/);
    const command = args.shift().toLowerCase()

    if (message.content.startsWith(main.prefix)) {

        switch (command) {
            case ("ping"):
                client.commands.get('ping').execute(message, args);
                break;

            case ("info"):
                client.commands.get('info').execute(message, args);
                break;
            case ("botinfo"):
                if (message.member.roles.cache.some(role => role.name === 'KnyszuBotAdmin')) {
                    let botInfoVar = new Discord.MessageEmbed()
                        .setDescription("__**Informacje**__")
                        .setColor(0x15f153)
                        .addField("Od odpalenia Dołączyło: ", `${info.membersJoined}`)
                        .addField("Aktualna Wersja: ", main.version)

                    message.channel.send(botInfoVar)
                } else {
                    message.channel.send('Nie masz uprawnień do wykonania tej komendy')
                }
        }

    }
})