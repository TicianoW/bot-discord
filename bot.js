const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Loggeado en ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});
client.on('message', msg => {
    if (msg.content === 'infoserver') {
        
        let embedsv = new Discord.MessageEmbed()
        .setAuthor("Info de este Servidor", msg.guild.iconURL)
        .setColor("RED")
        .addField("Nombre de el Servidor", msg.guild.name)
        .addField("ID de el Servidor", msg.guild.id)
        .addField("Owner de el Servidor", msg.guild.owner)
        .addField("Miembros", msg.guild.memberCount)
      msg.reply(embedsv);
    }
  });

client.login('');
