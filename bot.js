const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
client.on('ready', () => {
  console.log(`Loggeado en ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === `${config.prefijo}ping`) {
    msg.reply('Pong!');
  }
});

client.on('message', msg => {
    if (msg.content === `${config.prefijo}infoserver`) {
        let embedsv = new Discord.MessageEmbed()
        .setAuthor("Info de este Servidor")
        .setColor("RED")
        .addField("Nombre de el Servidor", msg.guild.name)
        .addField("ID de el Servidor", msg.guild.id)
        .addField("Owner de el Servidor", msg.guild.owner)
        .addField("Miembros", msg.guild.memberCount)
        .addField("Servidor creado el", msg.guild.createdAt)
        .setFooter(config.footer)
      msg.reply(embedsv);
    }
  });

  client.on('message', msg => {
    if (msg.content === `${config.prefijo}miinfo`) {
      let embedin = new Discord.MessageEmbed()   
      .setAuthor(`Informacion de ${msg.author.tag}`)
      .setColor("RED")
      .addField("Usuario:", `**${msg.author.tag}** [**__${msg.author}__**]`, true)
      .addField("ID Usuario:", `\`${msg.author.id}\``, true)
      .addField("Cuenta creada el:", `${msg.author.createdAt}`)
      .setFooter(config.footer)
      msg.reply(embedin);
      }
  });

  client.on('channelUpdate', (oldChannel, newChannel) => {
    if(!oldChannel.guild) return;
    oldChannel.guild.fetchAuditLogs().then(logs => {
       let userID = logs.entries.first().executor.id;
       if(oldChannel.name !== newChannel.name) {
        let embededcan = new Discord.MessageEmbed()  
        .setTitle('**[CANAL EDITADO]**')
        .setColor('ORANGE')
        .addField("Anterior Nombre:", oldChannel.name, true)
        .addField("Nuevo Nombre:", newChannel.name, true)
        .addField("ID De el Canal:", `\`${oldChannel.id}\``, false)
        .addField("Canal Editado por:", `**__<@!${userID}>__**`, true)
        .addField("ID De el que ha editado el Canal", `\`${userID}\``, true)
        .setTimestamp()
        .setFooter(config.footer)
        let channel = oldChannel.guild.channels.cache.get(config.idcanallogs);
        channel.send(embededcan);
       }
    })
  })

  client.on('channelCreate', (channel) => {
    if(!channel.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
    if(!channel.guild) return;
    channel.guild.fetchAuditLogs().then(logs => { 
     let userID = logs.entries.first().executor.id;
       let embedcrcan = new Discord.MessageEmbed() 
       .setTitle('**[CANAL CREADO]**')
       .setColor('GREEN')
       .addField("Nombre de el Canal:", channel.name, true)
       .addField("ID De el Canal:", `\`${channel.id}\``, true)
       .addField("Tipo de Canal:", `\`${channel.type}\``, false)
       .addField("Canal Creado por:", `**__<@!${userID}>__**`, true)
       .addField("ID Creador de el Canal", `\`${userID}\``, true)
       .setTimestamp()
       .setFooter(config.footer)
       let channel22 = client.channels.cache.get(config.idcanallogs);
       channel22.send(embedcrcan);
    })
   })

   client.on('channelDelete', (channel) => {
    if(!channel.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
    if(!channel.guild) return;
    channel.guild.fetchAuditLogs().then(logs => { 
     let userID = logs.entries.first().executor.id;
     let embedbrcan = new Discord.MessageEmbed() 
       .setTitle('**[CANAL ELIMINADO]**')
       .setColor('RED')
       .addField("Canal Eliminado:", channel.name, true)
       .addField("ID Canal Eliminado:", channel.id, true)
       .addField("Tipo de Canal:", channel.type, false)
       .addField("ID De el que ha borrado el Canal", `\`${userID}\``, true)
       .addField("Canal Eliminado Por:", `**__<@!${userID}>__**`, true)
       .setTimestamp()
       .setFooter(config.footer)
       let channel = client.channels.cache.get(config.idcanallogs);
       channel.send(embedbrcan);
    })
   })

  client.on('roleUpdate', (oldRole, newRole) => {
    if(!oldRole.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
    oldRole.guild.fetchAuditLogs().then(logs => { 
     let userID = logs.entries.first().executor.id;
     if(oldRole.name !== newRole.name) {
      let embededrol = new Discord.MessageEmbed()  
         .setTitle('**[ROL EDITADO]**')
         .setColor('ORANGE')
         .addField("Anterior Nombre:", oldRole.name, true)
         .addField("Nuevo Nombre:", newRole.name, true)
         .addField("ID De el Rol:", `\`${oldRole.id}\``, false)
         .addField("Rol Editado por:", `**__<@!${userID}>__**`, true)
         .addField("ID De el que ha editado el Rol", `\`${userID}\``, true)
         .setTimestamp()
         .setFooter(config.footer)
         let channel = client.channels.cache.get(config.idcanallogs);
         channel.send(embededrol);
      }
    })
   })

   client.on('roleCreate', (role) => {
    if(!role.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
    role.guild.fetchAuditLogs().then(logs => { 
     let userID = logs.entries.first().executor.id;
     let embedcrrol = new Discord.MessageEmbed() 
       .setTitle('**[ROL CREADO]**')
       .setColor('GREEN')
       .addField("Nombre de el Rol:", role.name, true)
       .addField("ID De el Rol:", `\`${role.id}\``, false)
       .addField("Rol Creado por:", `**__<@!${userID}>__**`, true)
       .addField("ID Creador de el Rol", `\`${userID}\``, true)
       .setTimestamp()
       .setFooter(config.footer)
       let channel = client.channels.cache.get(config.idcanallogs);
       channel.send(embedcrrol);
    })
   })

   client.on('roleDelete', (role) => {
    if(!role.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
    role.guild.fetchAuditLogs().then(logs => {
     let userID = logs.entries.first().executor.id;
       let embedbrrol = new Discord.MessageEmbed() 
       .setTitle('**[ROL ELIMINADO]**')
       .setColor('RED')
       .addField("Rol Eliminado:", role.name, true)
       .addField("ID Rol Eliminado:", role.id, false)
       .addField("Rol Eliminado Por:", `**__<@!${userID}>__**`, true)
       .addField("ID De el que ha borrado el Rol", `\`${userID}\``, true)
       .setTimestamp()
       .setFooter(config.footer)
       let channel = client.channels.cache.get(config.idcanallogs);
       channel.send(embedbrrol);
    })
   })
   
client.login(config.token);
