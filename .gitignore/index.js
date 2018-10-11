var Themeparks = require("themeparks");
const Discord = require('discord.js');
const ce = require("embed-creator");
var prefix = "!";
const { Client, Util } = require('discord.js');
const PREFIX = "!";
const client = new Client({ disableEveryone: true });
var opus = require('opusscript')
client.login(process.env.DISNEY);

// Lancement
client.on('ready', () => {
	console.log('Bot en ligne!');
  client.user.setActivity('🏰 !aide')});
client.on('warn', console.warn);
client.on('error', console.error);

// Messages d'informations
client.on('guildMemberAdd', member => {
  var role = member.guild.roles.find("name", "Guest");
  member.addRole(role)
  var channel = client.channels.get('487657315579854848');
  if (!channel) return;
  channel.send(ce(
    "#00FF00", {"name": member.guild.name, "icon_url": member.guild.iconURL}, "", "",
    [{"name": "Passez un agréable moment en notre compagnie!", "value": member.user.tag }],
    {"text": "", "icon_url": member.guild.iconURL}, 
    {"thumbnail": member.user.displayAvatarURL}, true
  ));
});
client.on('guildMemberRemove', member => {
  var channel = client.channels.get('487657315579854848');
  if (!channel) return;
  channel.send(ce(
    "#FF0000", {"name": member.guild.name, "icon_url": member.guild.iconURL}, "", "",
    [{"name": "A bientôt!", "value": member.user.tag }],
    {"text": "", "icon_url": member.guild.iconURL}, 
    {"thumbnail": member.user.displayAvatarURL}, true
  ));
});
client.on('guildBanAdd', (guild, user) => {
  var channel = client.channels.get('487657315579854848');
  if (!channel) return;
  channel.send(ce(
    "#010101", {"name": guild.name, "icon_url": guild.iconURL}, "", "",
    [{"name": user.tag, "value": "est désormais banni." }],
    {"text": "", "icon_url": guild.iconURL}, 
    {"thumbnail": user.displayAvatarURL}, true
  ));
});
client.on('guildBanRemove', (guild, user) => {
  var channel = client.channels.get('487657315579854848');
  if (!channel) return;
  channel.send(ce(
    "#EE82EE", {"name": guild.name, "icon_url": guild.iconURL}, "", "",
    [{"name": user.tag, "value": "est autorisé à nous rejoindre de nouveau."}],
    {"text": "", "icon_url": guild.iconURL}, 
    {"thumbnail": user.displayAvatarURL}, true
  ));
});

// Liste de tout les parcs supportés par la library
for (var park in Themeparks.Parks)
// Accès à un parc
var disneyMagicKingdom = new Themeparks.Parks.DisneylandParisMagicKingdom();

// Informations sur le parc
client.on('message', message => {
  if (message.content === prefix + 'fastpass') {
    if (!message.member.hasPermission("ADMINISTRATOR")) return;
    disneyMagicKingdom.GetRideObject().then(function(fastpass) {
      for(var i=0, ride; ride=rides[i++];) {
        var channel = client.channels.get('487596220479438848');
        if (!channel) return;
        channel.send(fastpass.Available);
        channel.send("===============================")
      }
    }, console.error)}});
client.on('message', message => {
  if (message.content === prefix + 'debug') {
    if (!message.member.hasPermission("ADMINISTRATOR")) return;
    var channel = client.channels.get('487596220479438848');
    if (!channel) return;
    const chateau = client.emojis.find("name", "chateau")
    channel.send(`${chateau}`);
  }});
client.on('message', message => {
  if (message.content === prefix + 'disneyland') {
    var channel = client.channels.get('487596220479438848');
    if (!channel) return;
    const chateau = client.emojis.find("name", "chateau")
    channel.send(ce(
      "#010101", {"name": "", "icon_url": ""}, "", "",
      [{"name": `${chateau} Disneyland Paris`, "value": "Temps d'attentes"}],
      {"text": "", "icon_url": ""}, 
      {"thumbnail": "", "image": ""}, false
    ));
    disneyMagicKingdom.GetWaitTimes().then(function(rides) {
    for(var i=0, ride; ride=rides[i++];) {
    var channel = client.channels.get('487596220479438848');
    if (!channel) return;
    channel.send(ce(
    "#010101", {"name": "", "icon_url": ""}, "", "",
    [{"name": ride.name, "value": ride.waitTime + " minutes."}],
    {"text": "", "icon_url": ""}, 
    {"thumbnail": "", "image": ""}, true
    ))}});
}});

var disneyWaltDisneyStudios = new Themeparks.Parks.DisneylandParisWaltDisneyStudios();

client.on('message', message => {
  if (message.content === prefix + 'studios') {
    var channel = client.channels.get('487596220479438848');
    if (!channel) return;
    const wd = client.emojis.find("name", "wd")
    channel.send(ce(
      "#010101", {"name": "", "icon_url": ""}, "", "",
      [{"name": `${wd} Walt Disney Studios`, "value": "Temps d'attentes"}],
      {"text": "", "icon_url": ""}, 
      {"thumbnail": "", "image": ""}, false
    ));
    disneyWaltDisneyStudios.GetWaitTimes().then(function(rides) {
    for(var i=0, ride; ride=rides[i++];) {
    var channel = client.channels.get('487596220479438848');
    if (!channel) return;
    channel.send(ce(
    "#010101", {"name": "", "icon_url": ""}, "", "",
    [{"name": ride.name, "value": ride.waitTime + " minutes."}],
    {"text": "", "icon_url": ""}, 
    {"thumbnail": "", "image": ""}, true
    ))}});
}});

//Modération
client.on('message', async message => {
  if(message.author.bot) return;
  if(message.content.indexOf(PREFIX) !== 0) return;
  const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  if(command === "purge") {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return;
    const deleteCount = parseInt(args[0], 10);
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Veuillez indiquer un nombre compris entre 2 et 100 pour le nombre de messages à supprimer.");
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Impossible de supprimer les messages en raison de: ${error}`));
  };
});
var bannedwords = "pute,p ute,p u t e,pu te,put e,putain,p utain,pu tain,put ain,puta in,putai n,putaclic,clickbait,click bait,attention whore,,whore,fdp, fils de put,fille de pute,fils de pute,fils de puterie,fille de p ute,fils de p ute,f d p,fd p,f dp,bordel,catin,schizo,schizophrène,schiso,drogué,droguée,gouine,goudou,pédé,pd,p d,,enculé,enculer,enculée,enculés,enculées,tantouze,tafiole,tapette,con,c on,co n,c onne,co nne,con ne,conn e,conne,salope,s alope,salop,salo,allumeuse,chaudasse,mégère,pimbêche,connasse,connard,pétasse,niquer,nique,poufiasse,pisseuse,couillon,bite,nazi,beurette,rebeu,travelo,transsexuel,trans,hermaphrodite,casos,ksos,clodo,plouc,anal,anus,ass,a s s,a ss,bitch,b itch,bastard,boob,butt,blowjob,blow job,buttplug,clitoris,cock,crap,dick,dildo,fuck,f u c k,penis,pussy,scrotum,sex,s e x,sexe,s e x e,s ex,se x,slut,vagina".split(",");

client.on("message", msg => {
  if (msg.guild === null) return;
  if (!msg.content.toLowerCase().startsWith(prefix)) return;
    msg.delete();
  if (msg.author.bot) return;
  if (msg.content.toLowerCase().startsWith(prefix + "kick ")) {
    if (!msg.member.hasPermission("KICK_MEMBERS")) return;
    var mem = msg.mentions.members.first();
    var mc = msg.content.split(" ")[2];
    if (!mem)
      return msg.reply('Veuillez mentionner un utilisateur. (!kick @test#1234)');
    if (!mc)
      return msg.reply('Veuillez ajouter une raison. (!kick @test#1234 test)');
    mem.kick(mc).then(() => {
      msg.channel.send(mem.user.tag + " a été kick pour " + mc + "." + " (par " + msg.author.tag + ")");
    }).catch(e => {
      msg.channel.send("Une erreur s'est produite!");
    });
  }
  if (msg.content.toLowerCase().startsWith(prefix + "ban ")) {
    if (!msg.member.hasPermission("BAN_MEMBERS")) return;
    var mem = msg.mentions.members.first();
    var mc = msg.content.split(" ")[2];
    if (!mem)
      return msg.reply('Veuillez mentionner un utilisateur. (!ban @test#1234 test)');
    if (!mc)
      return msg.reply('Veuillez ajouter une raison. (!ban @test#1234 test)');
    mem.ban(mc).then(() => {
      msg.channel.send(mem.user.tag + " a été banni pour " + mc + "." + " (par " + msg.author.tag + ")");
    }).catch(e => {
      msg.channel.send("Une erreur s'est produite!");
    });
  }
  if (msg.content.toLowerCase().startsWith(prefix + "mute")) {
    if (!msg.member.hasPermission("MUTE_MEMBERS")) return;
    var mem = msg.mentions.members.first();
    var mc = msg.content.split(" ")[2];
    if (!mem)
      return msg.reply('Veuillez mentionner un utilisateur. (!mute @test#1234 test)');
    if (mem.hasPermission("MUTE_MEMBERS")) return;
    if (!mc)
      return msg.reply('Veuillez ajouter une raison. (!mute @test#1234 test)');
    if (msg.guild.roles.find("name", "Muet")) {
      mem.addRole(msg.guild.roles.find("name", "Muet")).then(() => {
        msg.channel.send(mem.user.tag + " est désormais muet pour " + mc + "." + " (par " + msg.author.tag + ")");
      }).catch(e => {
        msg.channel.send("Une erreur s'est produite!");
        console.log(e);
      });

    }
  }
  if (msg.content.toLowerCase().startsWith(prefix + "unmute")) {
    if (!msg.member.hasPermission("MUTE_MEMBERS")) return;
    var mem = msg.mentions.members.first();
    if (!mem)
      return msg.reply('Veuillez mentionner un utilisateur. (!unmute @test#1234)');
    if (msg.guild.roles.find("name", "Muet")) {
      mem.removeRole(msg.guild.roles.find("name", "Muet")).then(() => {
        msg.channel.send(mem.user.tag + " n'est plus muet.");
      }).catch(e => {
        msg.channel.send("Une erreur s'est produite");
        console.log(e);
      });

    }
  }
});

//Utilitaire
client.on('message', message => {
  if (message.content === prefix + 'aide') {
    message.channel.send(ce(
      "#010101", {"name": `Aide`, "icon_url": ""}, "", "",
      [{"name": "!disneyland", "value": "Afficher les temps d'attentes du parc Disneyland Paris."},
      {"name": "!studios", "value": "Afficher les temps d'attentes du parc Walt Disney Studios."},
      {"name": "!castmember", "value": "Afficher les commandes de modération."}],
      {"text": "", "icon_url": ""}, 
      {"thumbnail": "", "image": ""}, true
    ))
  }
});
client.on('message', message => {
  if (message.content === prefix + 'castmember') {
    if (!message.member.hasPermission("MUTE_MEMBERS")) return;
    message.channel.send(ce(
      "#010101", {"name": `Aide CastMember`, "icon_url": ""}, "", "",
      [{"name": "!purge <2-100>", "value": "Supprimer des messages dans un salon textuel."},
      {"name": "!kick <@guest#1234> <raison>", "value": "Expulser un guest du serveur discord."},
      {"name": "!ban <@guest#1234> <raison>", "value": "Bannir un guest du serveur discord."},
      {"name": "!mute <@guest#1234> <raison>", "value": "Rendre muet un guest."},
      {"name": "!unmute <@guest#1234>", "value": "Redonner la parole à un guest."},
      {"name": "!sondage;<Question>;<Choix1>;<Choix2>;<Choix3>", "value": "Lancer un sondage."}],
      {"text": "", "icon_url": ""}, 
      {"thumbnail": "", "image": ""}, true
    ))
  }
});

client.on('message', message => {
  const args = message.content.slice(prefix.length).trim().split(';');
  const command = args.shift().toLowerCase();
  if (command === "sondage") {
    if(!message.member.hasPermission("KICK_MEMBERS")) return;
    let question = args[0];
    let choix1 = args[1];
    let choix2 = args[2];
    let choix3 = args[3];
    if (args.length === 0)
      return message.reply('**Mauvais format:** `!sondage;<Question>;<Choix1>;<Choix2>;<Choix3>`')
  var channel = client.channels.get('499918358263889920');
  channel.send("~~-----------~~" + '\n' + '\n' + ":question:" + `**__${question}__**` + '\n'  + '\n' + "" + ":one:" + ` **${choix1}**` +  '\n' + ":two:" + ` **${choix2}**` +  '\n' + ":three:" + ` **${choix3}**` + '\n' + '\n' + "*(Créer par: " + message.author.username + ")*")
  .then(function (message) {
    message.react('1⃣').then(() => message.react('2⃣')).then(() => message.react('3⃣'));
    })}});
