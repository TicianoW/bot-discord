const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
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
    if (msg.content === 'miinfo') {
   
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
    // Validamos que el Evento sea un Server
    if(!oldChannel.guild) return;
  
    // Solicitamos los datos de el Registro de Auditoria
    oldChannel.guild.fetchAuditLogs().then(logs => { 
       // Obtenemos el id de el Autor de el Log
       let userID = logs.entries.first().executor.id;
  
       // Verificamos que se haya actualizado el nombre de un canal
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
  client.on('roleUpdate', (oldRole, newRole) => {
    // verificamos si nuestro bot tiene permisos de ver el log de auditoria de un servidor
    if(!oldRole.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
   
    // Solicitamos los datos de el Registro de Auditoria
    oldRole.guild.fetchAuditLogs().then(logs => { 
     // Obtenemos el id de usuario autor del log
     let userID = logs.entries.first().executor.id;

   
      // Verificamos que se haya actualizado el nombre de un ROL
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
    // Verificamos si nuestro bot tiene permisos de ver el log de auditoria de un servidor
    if(!role.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
   
    // Solicitamos los datos de el Registro de Auditoria
    role.guild.fetchAuditLogs().then(logs => { 
     // Obtenemos el id de usuario autor del log
     let userID = logs.entries.first().executor.id;
 
   
     // Verificamos que se haya actualizado el nombre de un rol
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
client.login(config.token);
