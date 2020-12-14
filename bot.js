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

  client.on('message', msg => {
    if (msg.content === 'infousuario') {

        let embedus = new Discord.MessageEmbed()
        .setAuthor("Info de el Usuario", miembro.displayAvatarURL)
        .addField("Usuario:", `(**${miembro.tag}**) [${miembro}]`)
        .addField("ID Usuario:", `${miembro.id}`)
        .setThumbnail(miembro.displayAvatarURL)
        .setFooter("Info solicitada por", msg.author.tag, msg.author.displayAvatarURL)
        msg.reply(embedus);
    }
});

client.login('');
